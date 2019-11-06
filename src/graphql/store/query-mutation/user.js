import gql from "graphql-tag";

export const GET_CURRENT_USER_QUERY = gql`
query getCurrentUser {
  currentUser @client{
    authenticated
    user{
      picture
      name
      lastname
      email
      id
    }
  }
}
`;

export const LOGIN_USER_MUTATION = gql`
  mutation loginUser($currentUser: UserInput) {
    loginUser(currentUser: $currentUser) @client
  }
`;

export const LOGOUT_USER_MUTATION = gql`
  mutation logoutUser {
    logoutUser @client
  }
`;


