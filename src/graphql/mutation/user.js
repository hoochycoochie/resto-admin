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

      token
    }
  }
`;

export const createTeamMemberMutation = gql`
  mutation createTeamMember(
    $phone: String!
    $password: String!
    $name: String!
    $lastname: String!
    $email: String!
    $role_ids: [String!]!
  ) {
    createTeamMember(
      phone: $phone
      password: $password
      name: $name
      lastname: $lastname
      email: $email
      role_ids: $role_ids
    ) {
      ok
      user {
        id
        email
        lastname
        name
        picture
        phone
        
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
