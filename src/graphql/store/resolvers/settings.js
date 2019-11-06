import {
  GET_CURRENT_MENU_QUERY,
  GET_CURRENT_LANG_QUERY
} from "../query-mutation/settings";

export const toggleMenu = async (_obj, _args, { cache }) => {
  try {
    const {
      smallMenu: { smallMenu }
    } = await cache.readQuery({
      query: GET_CURRENT_MENU_QUERY
    });

    const result = !smallMenu;

    await cache.writeQuery({
      query: GET_CURRENT_MENU_QUERY,
      data: { smallMenu: { __typename: "smallMenu", smallMenu: result } }
    });

    return true;
  } catch (error) {
    console.log("error toggleMenu", error);
  }
};

export const changeLang = async (_obj, { lang }, { cache }) => {
  try {
    await cache.writeQuery({
      query: GET_CURRENT_LANG_QUERY,
      data: { lang: { __typename: "lang", lang } }
    });

    return true;
  } catch (error) {
    console.log("error changeLang", error);
  }
};
