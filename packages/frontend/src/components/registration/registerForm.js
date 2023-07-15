import { Formik, Form, ErrorMessage, Field } from "formik";
import css from "./registerForm.module.css";
import { PasswordSecureLevelBar } from "../passwordSecureBar/PasswordSecureLevelBar";
import { validationSchema } from "../../validations/validateRegisterForm";

export const RegisterForm = () => {
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
              <label htmlFor='email'></label>
              <Field
                id='email'
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
                id='password'
                name='password'
                type='password'
                placeholder='Password'
                value={values.password}
                autoComplete='off'
              />
              <PasswordSecureLevelBar password={values.password} />
              <ErrorMessage name='password'>
                {(error) => <p>{error}</p>}
              </ErrorMessage>
              <label htmlFor='confirmPassword'></label>
              <Field
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                placeholder='Confirm password'
                value={values.confirmPassword}
                autoComplete='off'
              />
              <ErrorMessage name='confirmPassword'>
                {(error) => <p>{error}</p>}
              </ErrorMessage>
              <label htmlFor='name'></label>
              <Field
                id='name'
                name='name'
                type='text'
                placeholder='First name'
                value={values.name}
              />
              <ErrorMessage name='name'>
                {(error) => <p>{error}</p>}
              </ErrorMessage>
              <button type='submit'>Register</button>
              <button type='button'>Login</button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};
