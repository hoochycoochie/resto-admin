import gql from "graphql-tag";

export const GET_CURRENT_MENU_QUERY = gql`
  query getMenu {
    smallMenu @client {
      smallMenu
    }
  }
`;

export const TOGGLE_MENU_MUTATION = gql`
  mutation toggleMenu {
    toggleMenu @client
  }
`;

export const GET_CURRENT_LANG_QUERY = gql`
  query getLang {
    lang @client {
      lang
    }
  }
`;

export const CHANGE_LANG_MUTATION = gql`
  mutation changeLang($lang: String) {
    changeLang(lang: $lang) @client
  }
`;
