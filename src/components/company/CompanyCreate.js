import React from "react";
import { Button, Modal, Form, Input, TextArea } from "semantic-ui-react";
import { colors } from "../../utils/constants";
import { FormattedMessage } from "react-intl";
import FieldError from "../FieldError";
import UserListInput from "./UserListInput";
const FormField = Form.Field;

const CompanyCreate = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  open,
  cancel,
  disabled
}) => (
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
      <FormattedMessage id="company_creation" />
    </Modal.Header>
    <Modal.Content scrolling>
      <Modal.Description>
        <Form loading={isSubmitting} onSubmit={handleSubmit} fluid>
          <FormField required>
            <label>
              <FormattedMessage id="owner" />
            </label>

            <UserListInput
              error={
                touched &&
                touched.errors &&
                touched.errors.owner_id &&
                errors &&
                errors.owner_id
              }
              setFieldValue={setFieldValue}
            />

            {touched.owner_id && errors.owner_id && (
              <FieldError message={errors.owner_id} />
            )}
          </FormField>
          <Form.Group widths="equal">
            <FormField required>
              <label>
                <FormattedMessage id="name" />
              </label>

              <Input
                icon="setting"
                value={values.name}
                name="name"
                fluid={1}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {touched.name && errors.name && (
                <FieldError message={errors.name} />
              )}
            </FormField>
            <FormField required>
              <label>
                <FormattedMessage id="reference" />
              </label>

              <Input
                icon="key"
                value={values.reference}
                name="reference"
                fluid={1}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.reference && errors.reference ? true : false}
              />

              {touched.reference && errors.reference && (
                <FieldError message={errors.reference} />
              )}
            </FormField>
          </Form.Group>

          <FormField>
            <label>
              <FormattedMessage id="picture" />
            </label>

            <Input
              fluid={1}
              style={{ width: "40%" }}
              type="file"
              name="file"
              onChange={async ({
                target: {
                  validity,
                  files: [file]
                }
              }) => {
                await setFieldValue("file", file);
              }}
              fluid
              onBlur={handleBlur}
            />

            {touched.file && errors.file && (
              <FieldError message={errors.file} />
            )}
          </FormField>
          {values.file && (
            <FormField>
              <img
                src={URL.createObjectURL(values.file)}
                alt="senyobante"
                width="100"
                height="100"
              />
            </FormField>
          )}
          <FormField required>
            <label>
              <FormattedMessage id="description" />
            </label>

            <TextArea
              icon="setting"
              value={values.description}
              name="description"
              style={{ width: "100%" }}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {touched.description && errors.description && (
              <FieldError message={errors.description} />
            )}
          </FormField>
          <Button
            disabled={disabled}
            type="submit"
            style={{ backgroundColor: colors.VIOLET, color: colors.PINK }}
          >
            <FormattedMessage id="create" />
          </Button>
        </Form>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default CompanyCreate;
