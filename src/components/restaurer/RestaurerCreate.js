import React from "react";
import { Button, Modal, Form, Input } from "semantic-ui-react";
import { colors } from "../../utils/constants";
import { FormattedMessage } from "react-intl";
import FieldError from "../FieldError";
const FormField = Form.Field;

const RestaurerCreate = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,

  open,
  cancel,
  disabled
}) => {
  console.log("errors DelivererCreate", errors);

  return (
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
        <FormattedMessage id="register" />
      </Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          <Form loading={isSubmitting} onSubmit={handleSubmit} fluid>
            <Form.Group widths="equal">
              <FormField required>
                <label>
                  <FormattedMessage id="name" />
                </label>

                <Input
                  icon="user"
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
                  <FormattedMessage id="lastname" />
                </label>

                <Input
                  icon="user"
                  value={values.lastname}
                  name="lastname"
                  fluid={1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                {touched.lastname && errors.lastname && (
                  <FieldError message={errors.lastname} />
                )}
              </FormField>
            </Form.Group>

            <Form.Group widths="equal">
              <FormField required>
                <label>
                  <FormattedMessage id="email" />
                </label>

                <Input
                  icon="at"
                  value={values.email}
                  name="email"
                  fluid={1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                {touched.email && errors.email && (
                  <FieldError message={errors.email} />
                )}
              </FormField>

              <FormField required>
                <label>
                  <FormattedMessage id="phone" />
                </label>

                <Input
                  icon="phone"
                  value={values.phone}
                  name="phone"
                  fluid={1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                {touched.phone && errors.phone && (
                  <FieldError message={errors.phone} />
                )}
              </FormField>
              <FormField required>
                <label>
                  <FormattedMessage id="password" />
                </label>

                <Input
                  icon="lock"
                  type="password"
                  value={values.password}
                  name="password"
                  fluid
                  onChange={handleChange}
                  error={touched.password && errors.password ? true : false}
                />

                {touched.password && errors.password && (
                  <FieldError message={errors.password} />
                )}
              </FormField>
            </Form.Group>

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
};

export default RestaurerCreate;
