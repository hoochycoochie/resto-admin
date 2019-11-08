import React, { useState } from "react";
import * as Yup from "yup";
import { withFormik } from "formik";
import Layout from "../layout/layoutadmin";
import { compose, graphql } from "react-apollo";
import Loading from "../../components/Loading";
import { Header } from "semantic-ui-react";
import { colors } from "../../utils/constants";
import { FormattedMessage } from "react-intl";
import ApolloCacheUpdater from "apollo-cache-updater";
import {
  findRestaurersAdminQuery,
  userCompanyQuery
} from "../../graphql/query/user";
import { createRestaurerMutation } from "../../graphql/mutation/user";
import RestaurerCreate from "../../components/restaurer/RestaurerCreate";
import RestaurerList from "../../components/restaurer/RestaurerList";
import RestaurerSearch from "../../components/restaurer/RestaurerSearch";

function TeamViewList({
  users: { loading, fetchMore, ...rest },
  handleSubmit: handleSubmit2,
  ...secondRest
}) {
  const [activePage, setActivePage] = useState(1);
  const [name, setName] = useState("");
  const [createModal, setCreateModal] = useState(false);
  if (loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }
  const isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  const load = async variables => {
    await fetchMore({
      variables: {
        ...variables
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        const { findRestaurersAdmin } = fetchMoreResult;
        return Object.assign({}, prev, {
          findRestaurersAdmin
        });
      }
    });
  };
  const onPageChange = async ({ activePage, skip, take }) => {
    try {
      await setActivePage(activePage);

      const variables = {
        skip,
        take
      };
      if (name && name.trim().length > 0) {
        variables.name = name;
      }
      await load(variables);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onSearch = async e => {
    e.preventDefault();
    await load({ name });
  };
  const onSearchChange = async e => {
    const search = e.target.value;

    await setName(search);
    if (search.trim().length === 0) {
      await load({});
    }
  };
  const handleSubmit = async () => {
    try {
      const {
        values: { email, phone, password, name, lastname },
        setSubmitting,
        setFieldError,
        handleReset,
        save
      } = secondRest;
      if (!email || !phone || !password || !name || !lastname) return;
      await setSubmitting(true);
      const variables = { email, phone, password, name, lastname };

      const response = await save({
        variables,
        update: async (proxy, { data }) => {
          console.log("data", data);
          const mutationResult = data.createRestaurer.user; // mutation result to pass into the updater
          const updates = ApolloCacheUpdater({
            proxy, // apollo proxy
            queriesToUpdate: [findRestaurersAdminQuery, userCompanyQuery], // queries you want to automatically update
            searchVariables: {},
            mutationResult,
            operation: {
              type: "ADD",
              add: ({ query, data }) => {
                if (query.toString() === "findRestaurersAdmin") {
                  return {
                    ...data,
                    total: data.total + 1,
                    data: [{ ...mutationResult }, ...data.data]
                  };
                }

                if (query.toString() === "userCompany") {
                  return {
                    data: [{ ...mutationResult }, ...data]
                  };
                }
              }
            }
          });
          
        }
      });

      const { ok, errors } = response.data.createRestaurer;

      if (ok) {
        await setSubmitting(false);
        await handleReset();
        await setCreateModal(false);
      } else {
        await setSubmitting(false);
        errors.forEach(async error => {
          const message = <FormattedMessage id={error.message} />;
          await setFieldError(error.path, message);
        });
      }
    } catch (error) {
      await secondRest.setSubmitting(false);
      console.log("error login user", error);
    }
  };

  const {
    findRestaurersAdmin: { data, skip, take, total }
  } = rest;
  return (
    <Layout>
      <div>
        <Header
          size="medium"
          style={{
            color: colors.VIOLET,
            textAlign: "center",
            fontStyle: "italic"
          }}
        >
          Liste des Restaurateurs
        </Header>
        <Header
          floated="left"
          size="medium"
          style={{
            color: colors.VIOLET,
            textAlign: "center",
            fontStyle: "italic"
          }}
        ></Header>
      </div>

      <RestaurerSearch
        modal={async () => await setCreateModal(true)}
        name={name}
        disabled={!name || name.trim().length === 0}
        onClick={onSearch}
        onChange={onSearchChange}
      />

      <RestaurerList
        onPageChange={onPageChange}
        activePage={activePage}
        data={data}
        skip={skip}
        total={total}
        loading={loading}
        take={take}
      />
      <RestaurerCreate
        {...secondRest}
        disabled={isEmpty(secondRest.errors) ? false : true}
        handleSubmit={handleSubmit}
        open={createModal}
        cancel={async () => await setCreateModal(false)}
      />
    </Layout>
  );
}
const registerSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .typeError(<FormattedMessage id="required" />)
    .min(2, <FormattedMessage id="min_2_characters" />)
    .max(50, <FormattedMessage id="max_50_characters" />)
    .required(<FormattedMessage id="required" />),

  phone: Yup.string()
    .trim()
    .typeError(<FormattedMessage id="required" />)
    .min(2, <FormattedMessage id="min_2_characters" />)
    .max(50, <FormattedMessage id="max_50_characters" />)
    .required(<FormattedMessage id="required" />),

  email: Yup.string()
    .trim()
    .typeError(<FormattedMessage id="required" />)
    .min(2, <FormattedMessage id="min_2_characters" />)
    .max(300, <FormattedMessage id="max_50_characters" />)
    .required(<FormattedMessage id="required" />),

  lastname: Yup.string()
    .trim()
    .typeError(<FormattedMessage id="required" />)
    .min(2, <FormattedMessage id="min_2_characters" />)
    .max(50, <FormattedMessage id="max_50_characters" />)
    .required(<FormattedMessage id="required" />),

  password: Yup.string()
    .trim()
    .typeError(<FormattedMessage id="required" />)
    .min(2, <FormattedMessage id="min_2_characters" />)
    .max(50, <FormattedMessage id="max_50_characters" />)
    .required(<FormattedMessage id="required" />)
});
export default compose(
  graphql(createRestaurerMutation, { name: "save" }),
  graphql(findRestaurersAdminQuery, {
    name: "users",
    options: () => ({
      fetchPolicy: "cache"
    })
  }),
  withFormik({
    validationSchema: registerSchema,
    mapPropsToValues: () => ({
      email: "",
      password: "",
      phone: "",
      name: "",
      lastname: ""
    })
  })
)(TeamViewList);
