import React from "react";
import { List } from "semantic-ui-react";
import { colors } from "../../utils/constants";

const SubprodCommand = ({ product }) => (
  //   <List.Item key={product.id}>
  //     <List.Content>
  //       <List.Header as="a">
  //         {product.name + " " + product.quantity + " x " + product.price + " cfa"}
  //       </List.Header>
  //       <List.Description as="a">
  //         {product.description ? product.description : ""}
  //       </List.Description>
  //     </List.Content>
  //   </List.Item>

  <div
    style={{
      //   margin: 10,
      //   padding: 10,
      borderRadius: 5,
      borderWidth: 5,
      borderColor: colors.VIOLET
    }}
  >
    
    <p style={{ fontSize: 12 }}>
      {product.name + " " + product.quantity + " x " + product.price + " cfa"}
    </p>
    <p> {product.description ? product.description : ""}</p>
  </div>
);

export default SubprodCommand;
