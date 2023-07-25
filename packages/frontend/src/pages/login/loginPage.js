import { LoginForm } from '../../components/login/login';
import './loginPage.scss';

import { selectError } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';
import { NotifyError } from '../../components/errNotifications/errNotify';

export default function LoginPage() {
  const error = useSelector(selectError);

  const shouldShowError = error !== null;

  return (
    <div className="page_center">
      <div className="page">
        <p className="page_text">Finance App</p>
        <LoginForm />
      </div>
      {shouldShowError ? <NotifyError error={error} /> : null}
    </div>
  );
}
