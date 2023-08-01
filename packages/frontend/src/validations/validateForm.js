import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(1).max(12),
  email: Yup.string().email().required('Please enter email'),
  password: Yup.string()
    .test('password', 'password length check', (value) => {
      return value.length > 0;
    })
    .required('Please enter valid password')
    .matches(
      /^.*(?=.{8,12})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character.'
    ),
  confirmPassword: Yup.string()
    .test('confirmPassword', 'password length check', (value) => {
      return value.length > 0;
    })
    .required('Please confirm password')
    .oneOf([Yup.ref('password')], "Passwords don't match."),
});

export default validationSchema;
