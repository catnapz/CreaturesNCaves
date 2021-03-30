import React from "react";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";

import {
  Button,
  Form,
  FormGroup,
  FormInput,
  FormPasswordInput,
} from "../../../../components";
import { AuthService, FirebaseAuthErrorCodes } from "../../../../auth";

const loginFormValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("You need to fill this out")
    .email("This doesn't look like an email..."),
  password: yup.string().required("You need to fill this out"),
});

interface ILoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const onLoginFormSubmit = (
    values: ILoginFormValues,
    helpers: FormikHelpers<ILoginFormValues>
  ) => {
    AuthService.signInViaEmail(values.email, values.password).catch((error) => {
      switch (error.code) {
        case FirebaseAuthErrorCodes.USER_NOT_FOUND:
        case FirebaseAuthErrorCodes.WRONG_PASSWORD:
          helpers.setErrors({
            email: "Invalid Credentials, please check input",
            password: "Invalid Credentials, please check input",
          });
          break;
        default:
          console.error(error);
      }
    });
  };

  return (
    <Formik
      validationSchema={loginFormValidationSchema}
      onSubmit={onLoginFormSubmit}
      initialValues={{ email: "", password: "" }}
    >
      {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
        <Form className={"cnc-login--form"} onSubmit={handleSubmit}>
          <FormGroup controlId="loginFormGroup">
            <FormInput
              label="Email"
              type="text"
              name="email"
              placeHolder="your-email@address.ca"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.email}
              feedBackType="invalid"
              feedback={errors.email}
            />
            <FormPasswordInput
              label="Password"
              name="password"
              placeHolder="d4nkm3m35"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.password}
              feedBackType="invalid"
              feedback={errors.password}
            />
          </FormGroup>
          <Button
            className="cnc-login--button cnc-login--email-button"
            type="submit"
          >
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
