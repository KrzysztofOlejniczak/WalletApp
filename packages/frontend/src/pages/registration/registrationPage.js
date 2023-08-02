import { RegisterForm } from '../../components/registration/registerForm';
import './registrationPage.scss';
import { Helmet } from 'react-helmet-async';

export default function RegistrationPage() {
  return (
    <div className="page_center">
        <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="page_reg">
        <p className="page_text">Finance App</p>
        <RegisterForm />
      </div>
    </div>
  );
}
