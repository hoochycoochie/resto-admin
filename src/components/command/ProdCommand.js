import React from "react";
import { List, Image } from "semantic-ui-react";
import { colors } from "../../utils/constants";
import SubprodCommandList from "./SubprodCommandList";

const ProdCommand = ({ product }) => (
  //   <List.Item key={product.id}>

  //     <Image size="tiny" src={product.picture} />
  //     <List.Content>
  //       <List.Header  >
  //         {product.name +
  //           " " +
  //           product.quantity +
  //           " x " +
  //           product.price / product.quantity +
  //           " cfa"}
  //       </List.Header>
  //       <List.Description >
  //         {product.description ? product.description : ""}
  //       </List.Description>
  //     </List.Content>
  //   </List.Item>

  <div
    style={{
      //   margin: 10,
      //   padding: 10,

      borderRadius: 5,
      borderWidth: 10,
      borderColor: "red",
      backgroundColor:colors.LIGHT_GRAY
    }}
  >
    <Image size="tiny" src={product.picture} />
    <p style={{ fontSize: 12 }}>
      {product.name +
        " " +
        product.quantity +
        " x " +
        product.price / product.quantity +
        " cfa"}
    </p>
    <p> {product.description ? product.description : ""}</p>

    {product.subprods && product.subprods.length > 0 && (
      <div style={{marginLeft:30}}>
        <SubprodCommandList products={product.subprods} />
      </div>
    )}
  </div>
);

export default ProdCommand;
