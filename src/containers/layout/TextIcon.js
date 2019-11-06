import React from "react";

import { Icon } from "semantic-ui-react";

const style = {
  alignSelf: "center",
  paddingLeft: "4px"
};
function TextIcon({ children, hideText, name, color }) {
  return (
    <div style={{ whiteSpace: "nowrap", display: "inline-flex" }}>
      <Icon size="large" color={color} name={name} />
      <div style={style} hidden={hideText}>
        {children}
      </div>
    </div>
  );
}

export default TextIcon;
