import { LoginForm } from '../../components/login/login';
import './loginPage.scss';
import { Helmet } from 'react-helmet-async';

export default function LoginPage() {
  return (
    <div className="page_center">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="page">
        <p className="page_text">Finance App</p>
        <LoginForm />
      </div>
    </div>
  );
}
