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
import { findCategoryAdminQuery } from "../../graphql/query/category";
import { createCategoryMutation } from "../../graphql/mutation/category";
import CategorySearch from "../../components/category/CategorySearch";
import CategoryList from "../../components/category/CategorycatList";
import CategoryCreate from "../../components/category/CategoryCreate";

function CategoryViewList({
  cats: { loading, fetchMore, ...rest },
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

  const load = async variables => {
    await fetchMore({
      variables: {
        ...variables
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        const { findCategory } = fetchMoreResult;
        return Object.assign({}, prev, {
          findCategory
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
        values: { name, file },
        setSubmitting,
        setFieldError,
        handleReset,
        save
      } = secondRest;
      await setSubmitting(true);
      const response = await save({
        variables: { name, file },
        update: async (
          proxy,
          {
            data: {
              createCategory: { category }
            }
          }
        ) => {
          const mutationResult = category; // mutation result to pass into the updater
          const updates = ApolloCacheUpdater({
            proxy, // apollo proxy
            queriesToUpdate: [findCategoryAdminQuery], // queries you want to automatically update
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

      const { ok, errors } = response.data.createCategory;

      if (ok) {
        await setSubmitting(false);
        await handleReset();
        await setCreateModal(false);
      } else {
        await setSubmitting(false);
        console.log("errors",errors)
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
    findCategoryAdmin: { data, skip, take, total }
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
          {<FormattedMessage id="subcat_list" />}
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

      <CategorySearch
        modal={async () => await setCreateModal(true)}
        name={name}
        disabled={!name || name.trim().length === 0}
        onClick={onSearch}
        onChange={onSearchChange}
      />

      <CategoryList
        onPageChange={onPageChange}
        activePage={activePage}
        data={data}
        skip={skip}
        total={total}
        loading={loading}
        take={take}
      />
      <CategoryCreate
        {...secondRest}
        handleSubmit={handleSubmit}
        open={createModal}
        cancel={async () => await setCreateModal(false)}
      />
    </Layout>
  );
}
const FILE_SIZE = 1600 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const createCategorySchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .typeError(<FormattedMessage id="required" />)
    .min(2, <FormattedMessage id="min_2_characters" />)
    .max(100, <FormattedMessage id="max_100_characters" />)
    .required(<FormattedMessage id="required" />),

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
  graphql(createCategoryMutation, { name: "save" }),
  graphql(findCategoryAdminQuery, {
    name: "cats",
    options: () => ({
      variables: {},
      fetchPolicy: "cache"
    })
  }),
  withFormik({
    validationSchema: createCategorySchema,
    mapPropsToValues: () => ({ name: "", file: null })
  })
)(CategoryViewList);
