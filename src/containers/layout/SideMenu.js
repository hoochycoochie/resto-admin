import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import TextIcon from "./TextIcon";
import { graphql, compose } from "react-apollo";
import {
  GET_CURRENT_MENU_QUERY,
  TOGGLE_MENU_MUTATION
} from "../../graphql/store/query-mutation/settings";
import { withRouter } from "react-router-dom";
import {
  RESTAURANT_ROOT_PATH,
  ADMIN_COMPANY_PATH,
  ADMIN_TEAM_PATH,
  RESTAURANT_COMMAND_PATH,
  ADMIN_CATEGORY_PATH,
  ADMIN_RESTAURER_PATH,
  ADMIN_DELIVERER_PATH
} from "../../utils/static_constants";
import { FormattedMessage } from "react-intl";
import { colors } from "../../utils/constants";

function SideMenu({
  children,

  menu: { loading, ...rest },
  location: { pathname }
}) {
  const smallMenu =
    rest.smallMenu && rest.smallMenu.smallMenu
      ? rest.smallMenu.smallMenu
      : false;
  const activeStyle = { backgroundColor: colors.VIOLET, color: colors.PINK };
  const rootActive = pathname.toString() === RESTAURANT_ROOT_PATH;

  const commandActive = pathname.toString() === RESTAURANT_COMMAND_PATH;

  const companyActive = pathname.toString() === ADMIN_COMPANY_PATH;
  const teamActive = pathname.toString() === ADMIN_TEAM_PATH;
  const categoryActive = pathname.toString() === ADMIN_CATEGORY_PATH;
  const restaurerActive = pathname.toString() === ADMIN_RESTAURER_PATH;
  const delivererActive = pathname.toString() === ADMIN_DELIVERER_PATH;
  return (
    <div className="parent" style={{ padding: 10, marginTop: 10 }}>
      <div className={(smallMenu ? "small-side " : "") + "side"}>
        <Menu
          fixed="left"
          borderless
          className={(smallMenu ? "small-side" : "") + " side"}
          vertical
        >
          <Menu.Item
            as={Link}
            to={RESTAURANT_ROOT_PATH}
            name="dashboard"
            active={rootActive}
            style={rootActive ? activeStyle : {}}
          >
            <TextIcon hideText={smallMenu} name="home">
              <FormattedMessage id="general_condition" />
            </TextIcon>
          </Menu.Item>
          <Menu.Item
            as={Link}
            to={RESTAURANT_COMMAND_PATH}
            name="dashboard"
            active={commandActive}
            style={commandActive ? activeStyle : {}}
          >
            <TextIcon hideText={smallMenu} name="shop">
              <FormattedMessage id="commands" />
            </TextIcon>
          </Menu.Item>

          <Menu.Item
            as={Link}
            to={ADMIN_COMPANY_PATH}
            name="dashboard"
            active={companyActive}
            style={companyActive ? activeStyle : {}}
          >
            <TextIcon hideText={smallMenu} name="food">
              Restos
            </TextIcon>
          </Menu.Item>

          <Menu.Item
            as={Link}
            to={ADMIN_TEAM_PATH}
            name="dashboard"
            active={teamActive}
            style={teamActive ? activeStyle : {}}
          >
            <TextIcon hideText={smallMenu} name="users">
              Equipe senYobante
            </TextIcon>
          </Menu.Item>

          <Menu.Item
            as={Link}
            to={ADMIN_RESTAURER_PATH}
            name="dashboard"
            active={restaurerActive}
            style={restaurerActive ? activeStyle : {}}
          >
            <TextIcon hideText={smallMenu} name="user secret">
              Restaurateurs
            </TextIcon>
          </Menu.Item>
          <Menu.Item
            as={Link}
            to={ADMIN_DELIVERER_PATH}
            name="dashboard"
            active={delivererActive}
            style={delivererActive ? activeStyle : {}}
          >
            <TextIcon hideText={smallMenu} name="motorcycle">
              Livreurs
            </TextIcon>
          </Menu.Item>
          <Menu.Item
            as={Link}
            to={ADMIN_CATEGORY_PATH}
            name="dashboard"
            active={categoryActive}
            style={categoryActive ? activeStyle : {}}
          >
            <TextIcon hideText={smallMenu} name="settings">
              catégories
            </TextIcon>
          </Menu.Item>
        </Menu>
      </div>
      <div className={(smallMenu ? "small-content " : "") + "content"}>
        {children}
      </div>
    </div>
  );
}

export default compose(
  graphql(GET_CURRENT_MENU_QUERY, { name: "menu" }),
  graphql(TOGGLE_MENU_MUTATION, { name: "toggle" })
)(withRouter(SideMenu));
