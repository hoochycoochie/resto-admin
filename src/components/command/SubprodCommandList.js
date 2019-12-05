import React from "react";
import SubprodCommand from "./SubprodCommand";

const SubprodCommandList = ({ products }) => (
  <div>
    
    {products.map(p => (
      <SubprodCommand key={p.id} product={p} />
    ))}
  </div>
);

export default SubprodCommandList;
