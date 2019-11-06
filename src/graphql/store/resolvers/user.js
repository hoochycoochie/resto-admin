import { GET_CURRENT_USER_QUERY } from "../query-mutation/user";
import { USER_STORAGE, TOKEN_NAME } from "../../../utils/static_constants";

export const logoutUser = async (_obj, _args, { cache }) => {
  try {
    cache.writeQuery({
      query: GET_CURRENT_USER_QUERY,
      data: { currentUser: { __typename: "currentUser", authenticated: false } }
    });
    await localStorage.removeItem(USER_STORAGE);
    await localStorage.removeItem(TOKEN_NAME);

    return true;
  } catch (error) {
    console.log("error logoutUser", error);
  }
};

export const loginUser = async (_obj, { currentUser }, { cache }) => {
  try {
    const query = GET_CURRENT_USER_QUERY;
    await cache.writeQuery({
      query,
      data: {
        currentUser: { __typename: "currentUser", ...currentUser }
      }
    });

    return true;
  } catch (error) {
    console.log("error loginUser", error);
  }
};
