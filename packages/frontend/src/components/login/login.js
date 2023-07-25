import { Formik, Form } from 'formik';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';
import validationSchema from '../../validations/validateForm';

import TextInput from '../textInput2/textInput';
import MainButton from '../mainButton/mainButton';
import Logo from '../logo/logo';
import { ReactComponent as EmailIcon } from '../../images/icons/email.svg';
import { ReactComponent as LockIcon } from '../../images/icons/lock.svg';

import './login.scss';
import '../mainButton/mainButton.scss';

export const LoginForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
            <Form className="form-login" onSubmit={(e) => handleSubmit(e)}>
              <div className="logo">
                <Logo />
                <h1>Wallet</h1>
              </div>
              <div className="container_input">
                <TextInput
                  label={<EmailIcon width={20} height={16} />}
                  type="email"
                  name="email"
                  value={values.email}
                  placeholder="E-mail"
                  className="input"
                />

                <TextInput
                  label={<LockIcon width={16} height={21} />}
                  type="password"
                  name="password"
                  value={values.password}
                  placeholder="Password"
                  className="input"
                />
              </div>
              <div className="button_container">
                <MainButton type="submit" text="Login" className="logo_btn" />
                <div>
                  <NavLink className="main_btn" to="/register">
                    Register
                  </NavLink>
                </div>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};
