import React from "react";
import { Modal } from "semantic-ui-react";
import { colors } from "../../utils/constants";
import  OneCommand  from "./OneCommand";

const CommandModal = ({ open, cancel, command }) => (
  <Modal
    open={open}
    closeOnEscape={open}
    closeOnDimmerClick={open}
    onClose={cancel}
    centered={false}
    size="fullscreen"
  >
    <Modal.Header
      style={{ textAlign: "center", fontSize: 14, color: colors.VIOLET }}
    >
      {"commande no : "+command.reference}
    </Modal.Header>
    <Modal.Content scrolling>
      <Modal.Description>
        <OneCommand command={command} />
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default CommandModal;
