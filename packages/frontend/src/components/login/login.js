import { Formik, Form, ErrorMessage, Field } from "formik";
import css from "../registration/registerForm.module.css";

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
    <Formik initialValues={initialValues}>
      {(props) => {
        const { values } = props;

        return (
          <div>
            <h1>Wallet</h1>
            <Form className={css.form} onSubmit={(e) => handleSubmit(e)}>
              <label htmlFor='email'></label>
              <Field
                id='emailLog'
                name='email'
                type='email'
                placeholder='E-mail'
                value={values.email}
              />
              <ErrorMessage name='email'>
                {(error) => <p>{error}</p>}
              </ErrorMessage>
              <label htmlFor='password'></label>
              <Field
                id='passwordLog'
                name='password'
                type='password'
                placeholder='Password'
                value={values.password}
                autoComplete='off'
              />

              <button type='submit'>Register</button>
              <button type='button'>Login</button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};
