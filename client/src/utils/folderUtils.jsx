import { graphQLRequest } from './request';

export const foldersLoader = async () => {
  const query = `query ExampleQuery {
      folders {
        id
        name
        createdAt
      }
    }`;
  const data = await graphQLRequest({ query });
  return data;
};
export const addNewFolder = async (newFolder) => {
  console.log('newfolder: ', {newFolder})
  const query = `mutation Mutation($name: String!) {
    addFolder(name: $name) {
      name
      author {
        name
      }
    }
  }`;
  const data = await graphQLRequest({ 
    query, 
    variables: { name: newFolder.name } 
  });
  console.log({data})
  return data;
}
export const updateFolder = async(id, name) => {
  const query = `mutation Mutation($id: String!, $name: String!) {
    updateFolder(id: $id, name: $name) {
      id
      name
      author {
        name
      }
    }
  }`;
  const data = await graphQLRequest({ 
    query, 
    variables: { id, name } 
  });
  console.log({data})
  return data;
}
export const deleteFolderById = async (id) => {
  const query = `mutation Mutation($id: String!) {
    deleteFolder(id: $id)
  }`;
  const { deleteFolder} = await graphQLRequest({query, variables: {id}});
  return deleteFolder;
}