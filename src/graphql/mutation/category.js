import gql from "graphql-tag";

export const createCategoryMutation = gql`
  mutation createCategory($name: String!, $file: Upload!) {
    createCategory(name: $name, file: $file) {
      ok
      category {
        id
        name
        picture
        
        created_at
        updated_at
      }
      errors {
        path
        message
      }
    }
  }
`;
