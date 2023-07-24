import { LoginForm } from '../../components/Login/login';
import './loginPage.scss';

export default function LoginPage() {
  return (
    <div className="page_center">
      <div className="page">
        <p className="page_text">Finance App</p>
        <LoginForm />
      </div>
    </div>
  );
}
