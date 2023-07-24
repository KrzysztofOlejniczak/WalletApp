import { Formik, Form } from 'formik';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import validationSchema from '../../validations/validateForm';
import { PasswordStrengthBar } from '../passwordSecureBar/passwordStrengthBar';

import { ReactComponent as EmailIcon } from '../../images/icons/email.svg';
import { ReactComponent as LockIcon } from '../../images/icons/lock.svg';
import { ReactComponent as NameIcon } from '../../images/icons/name.svg';

import Logo from '../logo/Logo';
import TextInput from '../textInput/TextInput';
import TextInputConfirm from '../textInput/TextInputConfirm';
import MainButton from '../mainButton/MainButton';

import './registerForm.scss';
import '../mainButton/MainButton.scss';

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <Form className="form-register" onSubmit={(e) => handleSubmit(e)}>
            <div className="logo_reg">
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
                id="email"
              />
              <TextInput
                label={<LockIcon width={16} height={21} />}
                type="password"
                name="password"
                value={values.password}
                placeholder="Password"
                className="input"
                id="password"
              />
              <TextInputConfirm
                label={<LockIcon width={16} height={21} />}
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                placeholder="Confirm password"
                className="input"
              />
              <PasswordStrengthBar password={values.password} />
              <TextInput
                label={<NameIcon width={18} height={18} />}
                type="text"
                name="name"
                value={values.name}
                placeholder="First name"
                className="input"
                id="name"
              />
            </div>
            <div className="button_container">
              <MainButton type="submit" text="Register" className="logo_btn" />
              <div>
                <NavLink to="/login" className="main_btn">
                  Login
                </NavLink>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
