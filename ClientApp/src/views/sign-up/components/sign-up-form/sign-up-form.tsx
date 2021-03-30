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

const signUpFormValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("You need to fill this out")
    .email("This doesn't look like an email..."),
  password: yup.string().required("You need to fill this out").min(8).max(128),
});

interface ISignUpFormValues {
  email: string;
  password: string;
}

const SignUpForm = () => {
  const onSignUpFormSubmit = (
    values: ISignUpFormValues,
    helpers: FormikHelpers<ISignUpFormValues>
  ) => {
    AuthService.createUserViaEmail(values.email, values.password).catch(
      (error) => {
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
      }
    );
  };

  return (
    <Formik
      validationSchema={signUpFormValidationSchema}
      onSubmit={onSignUpFormSubmit}
      initialValues={{ email: "", password: "" }}
    >
      {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
        <Form className={"cnc-sign-up--form"} onSubmit={handleSubmit}>
          <FormGroup controlId="signUpFormGroup">
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
            className="cnc-sign-up--button cnc-sign-up--email-button"
            type="submit"
          >
            Sign up
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
