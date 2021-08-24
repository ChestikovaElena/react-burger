import { Redirect } from 'react-router-dom';
import LoginForm from '../components/login-form';
import { getCookie } from '../utils/cookie';

export const LoginPage = () => {
  const accessToken = getCookie('access_token');

  // if (accessToken && localStorage.getItem('refreshToken)) {
  //   return (
  //     <Redirect to={{ pathname: '/' }} />
  //   )
  // }

  return (
    <LoginForm />
  )
}