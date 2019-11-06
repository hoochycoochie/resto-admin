import React from "react";
import { Dropdown } from "semantic-ui-react";
import { graphql } from "react-apollo";
import { userCompanyQuery } from "../../graphql/query/user";

const UserListInput = ({
  users: { loading, userCompany },
  setFieldValue,
  error
}) => {
  return (
    <Dropdown
      style={{ width: 300 }}
      loading={loading}
      fluid
      search
      selection
      error={error}
      name="owner_id"
      onChange={async (_, { value }) => {
        // console.log("value cat id", value);
        console.log("owner_id",value)
        await setFieldValue("owner_id", value);
      }}
      options={
        userCompany && userCompany.length
          ? userCompany.map(cat => ({
              key: cat.id,
              value: cat.id,
              text: cat.name
            }))
          : []
      }
    />
  );
};

export default graphql(userCompanyQuery, {
  name: "users",
  options: { fetchPolicy: "cache" }
})(UserListInput);
