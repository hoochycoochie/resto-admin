import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { split, ApolloLink } from "apollo-link";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "apollo-link-ws";
import { withClientState } from "apollo-link-state";
import { onError } from "apollo-link-error";
import { getMainDefinition } from "apollo-utilities";
import { TOKEN_NAME } from "../utils/static_constants";
import { loginUser, logoutUser } from "./store/resolvers/user";
import { toggleMenu, changeLang } from "./store/resolvers/settings";
import { GET_CURRENT_USER_QUERY } from "./store/query-mutation/user";
import {
  GET_CURRENT_MENU_QUERY,
  GET_CURRENT_LANG_QUERY
} from "./store/query-mutation/settings";

// developpement
// const graphqlUrl = `http://localhost:3001/graphql`;
// const wsUrl = "ws://localhost:3001/graphql";

//prod
const graphqlUrl = `https://www.senyobante.site/graphql`;
const wsUrl = "wss://senyobante.site/graphql";

const cache = new InMemoryCache();

const initialState = {
  lang: {
    __typename: "lang",
    lang: "en"
  },
  smallMenu: {
    __typename: "smallMenu",
    smallMenu: false
  },
  currentUser: {
    __typename: "currentUser",
    authenticated: false,
    user: null,
    roles: null,
    company: null
  }
};
const stateLink = withClientState({
  cache,
  defaults: initialState,
  resolvers: {
    Mutation: {
      loginUser,
      logoutUser,
      toggleMenu,
      changeLang
    },
    Query: {
      getCurrentUser(_obj, { _ }, { cache }) {
        const query = GET_CURRENT_USER_QUERY;
        const { currentUser } = cache.readQuery({ query });
        return currentUser;
      },
      getMenu(_obj, { _ }, { cache }) {
        const query = GET_CURRENT_MENU_QUERY;
        const { smallMenu } = cache.readQuery({ query });
        return smallMenu;
      },
      getLang(_obj, { _ }, { cache }) {
        const query = GET_CURRENT_LANG_QUERY;
        const { lang } = cache.readQuery({ query });
        return lang;
      }
    }
  }
});
export const wsLink = new WebSocketLink({
  uri: wsUrl,
  options: {
    reconnect: true,
    connectionParams: async () => ({
      token: await localStorage.getItem(TOKEN_NAME)
    })
  }
});

const httpLink = createUploadLink({
  uri: graphqlUrl
});
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors)
    graphQLErrors.map(error => console.log("error graphql", error));
});

const authLink = setContext(async (_, { headers }) => {
  const token = await localStorage.getItem(TOKEN_NAME);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const finaleLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

export default new ApolloClient({
  connectToDevTools: true,
  link: ApolloLink.from([errorLink, stateLink, finaleLink]),

  cache
});
