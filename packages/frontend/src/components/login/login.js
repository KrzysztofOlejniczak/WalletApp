import { Formik, Form, ErrorMessage, Field } from "formik";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import css from "../registration/registerForm.module.css";
import validationSchema from "../../validations/validateForm";

export const LoginForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log(e);
    const form = e.currentTarget;
    dispatch(
      logIn({
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
            <img className="" src="" alt="wallet icon"></img>
            <h1>Wallet</h1>
            <Form className={css.form} onSubmit={(e) => handleSubmit(e)}>
              <label htmlFor="email">
                <Field
                  id="emailLog"
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  value={values.email}
                />
                <ErrorMessage name="email">
                  {(error) => <p className={css.formError}>{error}</p>}
                </ErrorMessage>
              </label>
              <label htmlFor="password">
                <Field
                  id="passwordLog"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  autoComplete="off"
                />
              </label>
              <button type="submit">Login</button>
              <NavLink className={css.link} to="/register">
                Register
              </NavLink>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};
