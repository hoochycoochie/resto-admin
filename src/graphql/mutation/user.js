import gql from "graphql-tag";

export const loginAdminMutation = gql`
  mutation loginAdmin($identifiant: String!, $password: String!) {
    loginAdmin(
      identifiant: $identifiant

      password: $password
    ) {
      ok
      errors {
        path
        message
      }

      user {
        id
        email
        lastname

        name
        phone
        picture
      }
      roles {
        member_id
        role_id
        name
        company_id
      }

      token
    }
  }
`;
