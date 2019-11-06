import React, { useState } from "react";
import { Icon, Image, Label, Menu } from "semantic-ui-react";
import { graphql, compose } from "react-apollo";
import Notification from "./Notification";
import {
  GET_CURRENT_USER_QUERY,
  LOGOUT_USER_MUTATION
} from "../../graphql/store/query-mutation/user";
import {
  TOGGLE_MENU_MUTATION,
  CHANGE_LANG_MUTATION
} from "../../graphql/store/query-mutation/settings";
import { colors } from "../../utils/constants";
import ConfirmModal from "../../components/ConfirmModal";

function TopMenu({
  toggle,
  logout,
  user: {
    currentUser: { user }
  }
}) {
  const [logoutModal, setLogoutModal] = useState(false);

  return (
    <Menu
      fixed="top"
      className="top-menu"
      style={{ backgroundColor: colors.VIOLET, color: colors.PINK }}
    >
      <Menu.Item
        color="yellow"
        className="no-border"
        onClick={async e => {
          e.preventDefault();
          await toggle();
        }}
      >
        <Icon name="bars" color="yellow" />
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item className="no-border" position="right">
          <Notification />
          <Label
            className="label-on-corner"
            style={{ color: colors.PINK }}
            size={"mini"}
            floating
            circular
          >
            22
          </Label>
        </Menu.Item>
        <Menu.Item className="no-border" position="right">
          <div className="display-inline">
            <Image circular size={"mini"} src={user.picture} />
            <Label style={{ color: colors.VIOLET }}>
              {user.lastname + " " + user.name}
            </Label>
          </div>
        </Menu.Item>
        <Menu.Item
          as="button"
          color="yellow"
          className="no-border"
          onClick={async e => {
            e.preventDefault();
            await setLogoutModal(true);
          }}
        >
          <Icon name="sign-out" color="yellow" size="big" />
        </Menu.Item>
      </Menu.Menu>

      <ConfirmModal
        title={"logout"}
        text="confirm_logout"
        open={logoutModal}
        cancel={async () => {
          await setLogoutModal(false);
        }}
        confirm={async () => {
          try {
            await setLogoutModal(false);
            await logout();
          } catch (error) {
          //  console.log("error logout", error);
          }
        }}
      />
    </Menu>
  );
}

export default compose(
  graphql(TOGGLE_MENU_MUTATION, { name: "toggle" }),
  graphql(GET_CURRENT_USER_QUERY, { name: "user" }),
  graphql(CHANGE_LANG_MUTATION, { name: "changeLang" }),
  graphql(LOGOUT_USER_MUTATION, { name: "logout" })
)(TopMenu);
