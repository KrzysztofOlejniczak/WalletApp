import { Formik, Form, ErrorMessage, Field } from "formik";
import css from "../registration/registerForm.module.css";
import validationSchema from "../../validations/validateForm";

export const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema}>
      {(props) => {
        const { values } = props;

        return (
          <div>
            <h1>Wallet</h1>
            <Form className={css.form} onSubmit={(e) => handleSubmit(e)}>
              <label htmlFor='email'>
                <Field
                  id='emailLog'
                  name='email'
                  type='email'
                  placeholder='E-mail'
                  value={values.email}
                />
                <ErrorMessage name='email'>
                  {(error) => <p className={css.formError}>{error}</p>}
                </ErrorMessage>
              </label>
              <label htmlFor='password'>
                <Field
                  id='passwordLog'
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={values.password}
                  autoComplete='off'
                />{" "}
              </label>
              <button type='submit'>Login</button>
              <button type='button'>Register</button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};
