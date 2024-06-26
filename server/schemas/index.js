export const typeDefs = `#graphql
scalar Date
type Folder {
    id: String!,
    name: String
    createdAt: String,
    author: Author,
    notes: [Note]
}

type Note {
    id: String!,
    content: String,
    updatedAt: Date
}

type Author {
    uid: String!,
    name: String
}

type Query {
    folders: [Folder],
    folder(folderId:String!): Folder,
    note(noteId:String): Note,
}

type Mutation {
    addFolder ( name: String! ): Folder,
    updateFolder ( id: String!, name: String! ): Folder,
    deleteFolder ( id: String! ): Boolean,

    addNote( content: String!, folderId: ID! ): Note,
    updateNote( id: String!, content: String! ): Note,
    deleteNote( id: String! ): Boolean,

    register( uid:ID!, name:String!): Author,
}
`;