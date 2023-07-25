import { LoginForm } from '../../components/login/login';
import { Container } from '@mui/material';

export default function LoginPage() {
  const error = useSelector(selectError);

  const shouldShowError = error !== null;

  return (
    <div className="page_center">
      <div className="page">
        <p className="page_text">Finance App</p>
        <LoginForm />
      </div>
    </div>
  );
}
