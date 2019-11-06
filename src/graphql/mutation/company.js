import gql from "graphql-tag";

export const createCompanyMutation = gql`
  mutation createCompany(
    $name: String!
    $description: String!
    $reference: String!
    $owner_id: String!
    $file: Upload
  ) {
    createCompany(
      name: $name
      description: $description
      reference: $reference
      owner_id: $owner_id
      file: $file
    ) {
      ok
      company {
        id
        name
        description
        reference
        picture
      }
      errors {
        path
        message
      }
    }
  }
`;
