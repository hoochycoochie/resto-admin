import React, { useState } from "react";
import * as Yup from "yup";
import { withFormik } from "formik";
import Layout from "../layout/layoutadmin";
import { compose, graphql } from "react-apollo";
import Loading from "../../components/Loading";
import { Header } from "semantic-ui-react";
import { colors } from "../../utils/constants";
import { FormattedMessage } from "react-intl";
import CompanySearch from "../../components/company/CompanySearch";
import CompanyCreate from "../../components/company/CompanyCreate";
import CompanyList from "../../components/company/CompanyList";
import ApolloCacheUpdater from "apollo-cache-updater";
import { findCompanyAdminQuery } from "../../graphql/query/company";
import { createCompanyMutation } from "../../graphql/mutation/company";

function CompanyViewList({
  companies: { loading, fetchMore, ...rest },
  handleSubmit: handleSubmit2,
  ...secondRest
}) {
  console.log("rest", rest);
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

        const { findCompanyAdmin } = fetchMoreResult;
        return Object.assign({}, prev, {
          findCompanyAdmin
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
        values: { name, description, reference, owner_id, file },
        setSubmitting,
        setFieldError,
        handleReset,
        save
      } = secondRest;
      if (!name || !description || !reference || !owner_id || !file) return;
      await setSubmitting(true);
      const response = await save({
        variables: { name, description, reference, owner_id, file },
        update: async (proxy, { data }) => {
          const mutationResult = data.createCompany.company; // mutation result to pass into the updater
          const updates = ApolloCacheUpdater({
            proxy, // apollo proxy
            queriesToUpdate: [findCompanyAdminQuery], // queries you want to automatically update
            searchVariables: {},
            mutationResult,
            operation: {
              type: "ADD",
              add: ({ data: { data, total, ...rest } }) => {
                return {
                  ...rest,
                  total: total + 1,
                  data: [{ ...mutationResult }, ...data]
                };
              }
            }
          });
          console.log("updates", updates);
        }
      });
      console.log("response.data.createCompany", response.data.createCompany);
      const { ok, errors } = response.data.createCompany;

      if (ok) {
        await setSubmitting(false);
        await handleReset();
        await setCreateModal(false);
      } else {
        errors.forEach(error => {
          const message = <FormattedMessage id={error.message} />;
          setFieldError(error.path, message);
          setSubmitting(false);
        });
      }
    } catch (error) {
      console.log("error login user", error);
    }
  };

  const {
    findCompanyAdmin: { data, skip, take, total }
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
          {<FormattedMessage id="company_list" />}
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

      <CompanySearch
        modal={async () => await setCreateModal(true)}
        name={name}
        disabled={!name || name.trim().length === 0}
        onClick={onSearch}
        onChange={onSearchChange}
      />

      <CompanyList
        onPageChange={onPageChange}
        activePage={activePage}
        data={data}
        skip={skip}
        total={total}
        loading={loading}
        take={take}
      />
      <CompanyCreate
        {...secondRest}
        disabled={isEmpty(secondRest.errors) ? false : true}
        handleSubmit={handleSubmit}
        open={createModal}
        cancel={async () => await setCreateModal(false)}
      />
    </Layout>
  );
}

const FILE_SIZE = 1600 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const createCompanySchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .typeError(<FormattedMessage id="required" />)
    .min(2, <FormattedMessage id="min_2_characters" />)
    .max(100, <FormattedMessage id="max_100_characters" />)
    .required(<FormattedMessage id="required" />),

  reference: Yup.string()
    .trim()
    .typeError(<FormattedMessage id="required" />)
    .min(10, <FormattedMessage id="min_10_characters" />)
    .max(100, <FormattedMessage id="max_100_characters" />)
    .required(<FormattedMessage id="required" />),

  owner_id: Yup.string().required(<FormattedMessage id="required" />),
  description: Yup.string()
    .trim()
    .min(100, <FormattedMessage id="min_100_characters" />)
    .required(<FormattedMessage id="required" />)
    .max(500, <FormattedMessage id="max_500_characters" />),

  file: Yup.mixed()
    .required(<FormattedMessage id="required" />)
    .test("fileFormat", <FormattedMessage id="not_supported" />, value => {
      if (value) {
        return value && SUPPORTED_FORMATS.includes(value.type);
      }
      return true;
    })
    .test("fileSize", <FormattedMessage id="file_too_large" />, value => {
      if (value) {
        return value && value.size <= FILE_SIZE;
      }
      return true;
    })
});

export default compose(
  graphql(createCompanyMutation, { name: "save" }),
  graphql(findCompanyAdminQuery, {
    name: "companies",
    options: () => ({
      variables: {},
      fetchPolicy: "cache"
    })
  }),
  withFormik({
    validationSchema: createCompanySchema,
    mapPropsToValues: () => ({
      name: "",
      reference: "",
      file: null,
      description: "",
      owner_id: ""
    })
  })
)(CompanyViewList);
