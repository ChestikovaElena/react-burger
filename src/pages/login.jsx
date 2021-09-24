import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginForm from '../components/login-form';
import styles from './login.module.css';

export const LoginPage = () => {
  const {isLoggedIn } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn
  }));
  
  if (isLoggedIn) {
    return (
      <Redirect to={{ pathname: '/' }} />
    )
  } else {
    return (
      <div className={ styles.wrapper }>
        <div className={ styles.content }>
          <LoginForm />
        </div>
      </div>
    )
  }
}