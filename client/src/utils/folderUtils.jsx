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