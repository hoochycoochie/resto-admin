import React from "react";
import ProdCommand from "./ProdCommand";

const ProdCommandList = ({ products }) => (
  <div>
    {products.map(p => (
      <ProdCommand key={p.id} product={p} />
    ))}
  </div>
);

export default ProdCommandList;
