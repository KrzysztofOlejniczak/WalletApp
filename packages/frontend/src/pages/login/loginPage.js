import { useSelector } from 'react-redux';
import { LoginForm } from '../../components/login/login';
import { Container } from '@mui/material';
import { selectError } from '../../redux/auth/selectors';
import { NotifyError } from '../../components/errNotifications/errNotify';

export default function LoginPage() {
  const error = useSelector(selectError);

  const shouldShowError = error !== 'Unable to fetch user' && error !== null;

  return (
    <>
      <Container fixed>
        <LoginForm />
      </Container>
      {/* <NotifyError error={error} /> */}
      {/* {shouldShowError ?? <NotifyError error={error} />} */}
    </>
  );
}
