import { LoginForm } from '../../components/login/login';
// import './loginPage.scss';
import { Helmet } from 'react-helmet-async';
import {
  AdaptiveContainer,
  BackgroundContainer,
  Wrapper,
} from './loginPage.styles.js';
import Typography from '@mui/material/Typography';
import Box  from '@mui/material/Box';

export default function LoginPage() {
  return (
    <Wrapper>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <BackgroundContainer>
        <AdaptiveContainer fixed>
          <Typography variant='h4'align='justify' component='h2' >Finance App</Typography>
          <LoginForm />
        </AdaptiveContainer>
      </BackgroundContainer>
    </Wrapper>
  );
}
