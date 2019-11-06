import React from "react";
import { FormattedMessage } from "react-intl";
import { Form, Input, Button } from "semantic-ui-react";
import { colors } from "../utils/constants";
import FieldError from "./FieldError";

const FormField = Form.Field;

const Login = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => {
  return (
    <Form loading={isSubmitting} onSubmit={handleSubmit}>
      <FormField required>
        <label>
          <FormattedMessage id="identifiant" />
        </label>

        <Input
          icon="at"
          value={values.identifiant}
          name="identifiant"
          fluid
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.identifiant && errors.identifiant ? true : false}
        />

        {touched.identifiant && errors.identifiant && (
          <FieldError message={errors.identifiant} />
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
      <Button
        type="submit"
        style={{ backgroundColor: colors.VIOLET, color: colors.PINK }}
      >
        <FormattedMessage id="login" />
      </Button>
    </Form>
  );
};

export default Login;
