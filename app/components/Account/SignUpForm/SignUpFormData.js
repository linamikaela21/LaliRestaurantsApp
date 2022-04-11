import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
    confirmPassword: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("E-mail Invalid")
      .required("E-mail is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password")], "Passwords should be equal"),
  });
}