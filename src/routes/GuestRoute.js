import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { compose, graphql } from "react-apollo";
import { GET_CURRENT_USER_QUERY } from "../graphql/store/query-mutation/user";
import { RESTAURANT_ROOT_PATH } from "../utils/static_constants";

const GuestRoute = ({
  component: Component,
  data: {
    currentUser: { authenticated }
  },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        !authenticated ? <Component {...props} /> : <Redirect to={RESTAURANT_ROOT_PATH} />
      }
    />
  );
};

export default compose(graphql(GET_CURRENT_USER_QUERY))(withRouter(GuestRoute));
