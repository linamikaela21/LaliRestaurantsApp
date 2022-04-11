import * as Yup from "yup";

export function initialValues() {
  return {
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  };
}

export function validationSchema() {
  return Yup.object({
    password: Yup.string().required("Password is required"),
    newPassword: Yup.string().required("Password is required"),
    confirmNewPassword: Yup.string()
      .required("Password is required")
      .oneOf(
        [Yup.ref("newPassword")],
        "Passwords should be equal"
      ),
  });
}