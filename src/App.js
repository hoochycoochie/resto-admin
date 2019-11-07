import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { graphql, compose } from "react-apollo";
import messages from "./i18n";
import { IntlProvider } from "react-intl";
import { Login, NotFound } from "./containers";
import { GuestRoute, AuthRoute } from "./routes";
import { Route } from "react-router-dom";

import { LOGIN_USER_MUTATION } from "./graphql/store/query-mutation/user";
import Home from "./containers/Home";
import {
  ROOT_PATH,
  LOGIN_PATH,
  RESTAURANT_ROOT_PATH,
  ADMIN_TEAM_PATH,
  NOT_FOUND_PATH,
  USER_STORAGE,
  RESTAURANT_COMMAND_PATH,
  ADMIN_COMPANY_PATH,
  ADMIN_CATEGORY_PATH,
  ADMIN_DELIVERER_PATH,
  ADMIN_RESTAURER_PATH
} from "./utils/static_constants";
import { GET_CURRENT_LANG_QUERY } from "./graphql/store/query-mutation/settings";
import {
  CommandViewList,
  TeamViewList,
  ConditionsView,
  CompanyViewList,
  CategoryViewList,
  DelivererViewList,
  RestaurerViewList
} from "./containers/admin";

class App extends React.Component {
  componentWillMount = async () => {
    const user = await localStorage.getItem(USER_STORAGE);

    if (user) {
      const currentUser = JSON.parse(user);
      await this.props.setUser({
        variables: {
          currentUser
        }
      });
    }
  };
  render() {
    const locale =
      this.props.lang && this.props.lang.lang && this.props.lang.lang.lang
        ? this.props.lang.lang.lang
        : "fr";
    return (
      <IntlProvider locale={locale} messages={messages[("en", "fr")]}>
        <BrowserRouter>
          <Switch>
            <GuestRoute exact path={ROOT_PATH} component={Home} />
            <Route exact path={NOT_FOUND_PATH} component={NotFound} />

            <GuestRoute exact path={LOGIN_PATH} component={Login} />

            <AuthRoute
              exact
              path={RESTAURANT_ROOT_PATH}
              component={ConditionsView}
            />

            <AuthRoute
              exact
              path={RESTAURANT_COMMAND_PATH}
              component={CommandViewList}
            />

            <AuthRoute path={ADMIN_COMPANY_PATH} component={CompanyViewList} />
            <AuthRoute path={ADMIN_TEAM_PATH} component={TeamViewList} />
            <AuthRoute
              path={ADMIN_CATEGORY_PATH}
              component={CategoryViewList}
            />
            <AuthRoute
              path={ADMIN_DELIVERER_PATH}
              component={DelivererViewList}
            />

            <AuthRoute
              path={ADMIN_RESTAURER_PATH}
              component={RestaurerViewList}
            />
          </Switch>
        </BrowserRouter>
      </IntlProvider>
    );
  }
}
export default compose(
  graphql(LOGIN_USER_MUTATION, { name: "setUser" }),
  graphql(GET_CURRENT_LANG_QUERY, { name: "lang" })
)(App);
