import React from "react";
import { Input, Button } from "semantic-ui-react";
import { colors } from "../../utils/constants";

const RestaurerListSearch = ({ disabled, onClick, onChange, name, modal }) => {
  return (
    <div>
      <Button
        floated="left"
        icon="search"
        size="medium"
        style={{ backgroundColor: colors.VIOLET, color: colors.PINK }}
        disabled={disabled}
        onClick={onClick}
      />
      <Input name="name" value={name} onChange={onChange} floated="right" />
      <Button
        onClick={modal}
        floated="right"
        icon="plus square"
        size="medium"
        style={{ backgroundColor: colors.VIOLET, color: colors.PINK }}
      />
    </div>
  );
};

export default RestaurerListSearch;
