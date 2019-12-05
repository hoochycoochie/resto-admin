import React, { useState } from "react";
import Layout from "../layout/layoutadmin";
import { compose, graphql } from "react-apollo";
 
import Loading from "../../components/Loading";
import { Header } from "semantic-ui-react";
import { colors } from "../../utils/constants";

import {  findCommandQuery } from "../../graphql/query/command";
import CommandList from "../../components/command/CommandList";

function CommandViewList({
  prods: { loading, fetchMore, findCommand },
  history
}) {
  const [activePage, setActivePage] = useState(1);

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
        ...variables,
        
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        const { findCommand } = fetchMoreResult;
        return Object.assign({}, prev, {
          findCommand
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

      await load(variables);
    } catch (error) {
      console.log("error", error);
    }
  };

  const { data, skip, take, total } = findCommand;

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
          Liste des commandes
        </Header>
      </div>

      <CommandList
        onPageChange={onPageChange}
        activePage={activePage}
        data={data}
        skip={skip}
        total={total}
        loading={loading}
        take={take}
      />
    </Layout>
  );
}

export default compose(
  // graphql(findCommandQuery, {
  //   name: "prods",
  //   options: () => ({
  //     variables: {
  //       company_id: JSON.parse(localStorage.getItem(COMPANY_ID_STORAGE))
  //     },
  //     fetchPolicy: "cache"
  //   })
  // }),

  graphql(findCommandQuery, {
    name: "prods",

    options: () => ({
      variables: {
        
        skip: 0,
        take: 10
      },
      fetchPolicy: "cache-and-network"
    })
  })
)(CommandViewList);
