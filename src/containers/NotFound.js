import React from "react";
import { Message } from "semantic-ui-react";

const NotFound = () => (
  <Message error>
    <Message.Header>Changes in Service</Message.Header>
    <p>
      We updated our privacy policy here to better service our customers. We
      recommend reviewing the changes.
    </p>
  </Message>
);

export default NotFound;
