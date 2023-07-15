import * as Yup from "yup";

export const validationSchema = Yup.object({
    name: Yup.string().min(1).max(12).required("Please enter the name"),
    email: Yup.string().email().required("Please enter email"),
    password: Yup.string()
      .required("Please enter valid password")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    confirmPassword: Yup.string()
      .required("Please confirm password")
      .oneOf([Yup.ref("password")], "Passwords don't match."),
  });