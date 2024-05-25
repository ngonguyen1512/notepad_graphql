import { graphQLRequest } from "./request";

export const notesLoader = async ({ params: { folderId } }) => {
    const query = `query ExampleQuery($folderId: String!) {
        folder(folderId: $folderId) {
            id
            name
            createdAt
            notes {
                id
                content
                updatedAt
            }
        }
    }`;
    const data = await graphQLRequest({ 
        query, 
        variables: {folderId} 
    });
    return data;
};
export const noteLoader = async ({ params: { noteId } }) => {
    const query = `query ExampleQuery($noteId: String!) {
        note(noteId: $noteId) {
            id
            content
            updatedAt
        }
    }`;
    const data = await graphQLRequest({ 
        query, 
        variables: {noteId} 
    });
    return data;
};
export const addNewNote = async({params, request}) => {
    const newNote = await request.formData();
    const formDataObj = {};
    newNote.forEach((value, key) => (formDataObj[key] = value));
    const query = `mutation Mutation($content: String!, $folderId: ID!) {
        addNote( content: $content, folderId: $folderId ) {
            id 
            content
        }
    }`;
    const { addNote } = await graphQLRequest({query, variables: formDataObj});
    return addNote;
}
export const updateNote = async({params, request}) => {
    const updated = await request.formData();
    
    const formDataObj = {};
    updated.forEach((value, key) => (formDataObj[key] = value));
    console.log('updated: ', {formDataObj})
    const query = `mutation Mutation($id: String!, $content: String!  ) {
        updateNote(content: $content, id: $id ) {
          id
          content
        }
      }`;
    const { updateNote } = await graphQLRequest({query, variables: formDataObj});
    return updateNote;
}
export const deleteNoteById = async (id) => {
    const query = `mutation DeleteNote($id: String!) {
        deleteNote(id: $id)
      } `;
    const { deleteNote } = await graphQLRequest({query, variables: {id}});
    return deleteNote;
}