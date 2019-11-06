import React from "react";
import { Button, Modal } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";

const ConfirmModal = ({ open, cancel, confirm, text, title }) => (
  <Modal
    open={open}
    closeOnEscape={open}
    closeOnDimmerClick={open}
    onClose={cancel}
  >
    <Modal.Header>{<FormattedMessage id={title} />}</Modal.Header>
    <Modal.Content>{<FormattedMessage id={text} />}</Modal.Content>
    <Modal.Actions>
      <Button
        onClick={cancel}
        negative
        content={<FormattedMessage id="cancel" />}
      />

      <Button
        onClick={confirm}
        positive
        labelPosition="right"
        icon="checkmark"
        content={<FormattedMessage id="confirm" />}
      />
    </Modal.Actions>
  </Modal>
);

export default ConfirmModal;
