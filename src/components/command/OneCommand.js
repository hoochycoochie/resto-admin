import React from "react";
import { compose, graphql } from "react-apollo";
import { Header } from "semantic-ui-react";
import { findOneCommandQuery } from "../../graphql/query/command";
import Loading from "../Loading";
import ProdCommandList from "./ProdCommandList";
import { colors } from "../../utils/constants";
import SubprodCommandList from "./SubprodCommandList";

const OneCommand = ({ oneCommand: { loading, findOneCommand } }) => {
  if (loading) {
    return <Loading />;
  }
  const { company_name, price, products, subprods, author } = findOneCommand;
  return (
    <div style={{ height: 1000 }}>
      <Header
        size="medium"
        style={{
          color: colors.VIOLET,
          textAlign: "center",
          fontStyle: "italic"
        }}
      >
        {company_name + " -> " + price + " cfa"}
      </Header>

      <p>
        <h1>
          {author.name.toUpperCase() + " " + author.lastname.toUpperCase()}
        </h1>
      </p>

      {products && products.length > 0 && (
        <ProdCommandList key={products.length} products={products} />
      )}
      {subprods && subprods.length > 0 && (
        <SubprodCommandList key={subprods.length} products={subprods} />
      )}
    </div>
  );
};

export default compose(
  graphql(findOneCommandQuery, {
    name: "oneCommand",
    options: ({ command: { id } }) => ({
      variables: {
        id
      },
      fetchPolicy: "cache"
    })
  })
)(OneCommand);
