import { Formik, Form, ErrorMessage, Field } from "formik";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./registerForm.module.css";
import validationSchema from "../../validations/validateForm";
import { PasswordStrengthBar } from "../passwordSecureBar/passwordStrengthBar";

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    const form = e.currentTarget;

    dispatch(
      register({
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );

    form.reset();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema}>
      {(props) => {
        const { values } = props;
        return (
          <div>
            <img className='' src='' alt='wallet icon'></img>
            <h1>Wallet</h1>
            <Form className={css.form} onSubmit={(e) => handleSubmit(e)}>
              <label htmlFor='email'>
                <Field
                  id='email'
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
                  id='password'
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={values.password}
                  autoComplete='off'
                />
                <PasswordStrengthBar password={values.password} />
                {values.password.length > 0 && (
                  <ErrorMessage name='password'>
                    {(error) => <p className={css.formError}>{error}</p>}
                  </ErrorMessage>
                )}
              </label>
              <label htmlFor='confirmPassword'>
                <Field
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  placeholder='Confirm password'
                  value={values.confirmPassword}
                  autoComplete='off'
                />
                {values.confirmPassword.length > 0 && (
                  <ErrorMessage name='confirmPassword'>
                    {(error) => <p className={css.formError}>{error}</p>}
                  </ErrorMessage>
                )}
              </label>
              <label htmlFor='name'>
                <Field
                  id='name'
                  name='name'
                  type='text'
                  placeholder='First name'
                  value={values.name}
                />
                <ErrorMessage name='name'>
                  {(error) => <p className={css.formError}>{error}</p>}
                </ErrorMessage>
              </label>
              <button type='submit'>Register</button>
              <NavLink className={css.link} to='/login'>
                Log In
              </NavLink>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};
