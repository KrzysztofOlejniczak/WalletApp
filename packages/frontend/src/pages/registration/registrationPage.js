import { RegisterForm } from '../../components/registration/registerForm';
import './registrationPage.scss';

export default function RegistrationPage() {
  return (
    <div className="page_center">
      <div className="page_reg">
        <p className="page_text">Finance App</p>
        <RegisterForm />
      </div>
    </div>
  );
}
