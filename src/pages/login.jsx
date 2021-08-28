import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginForm from '../components/login-form';

export const LoginPage = () => {
  const {isLoggedIn } = useSelector((state) => ({
    isLoggedIn: state.auth.isLoggedIn
  }));

  if (isLoggedIn) {
    return (
      <Redirect to={{ pathname: '/' }} />
    )
  }

  return (
    <LoginForm />
  )
}