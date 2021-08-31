import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import FormWrapper from '../form-wrapper';
import SpanWithLink from '../span-with-link';
import { logIn } from '../../services/actions/user';

export const LoginForm = () => {
  const { logInFailed, logInFailedMessage } = useSelector((state) => ({
    logInFailed: state.user.logInFailed,
    logInFailedMessage: state.user.logInFailedMessage
  }))
  const history = useHistory();
  const location = useLocation();

  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const target = e.target;
    setState({
      ...state,
      [target.name]: target.value
    });
  }

  const { from } = (location.state) || { from: { pathname: "/" } };
  const cb = () => {
    history.replace(from);
  };

  return (
    <FormWrapper title="Вход" actionFunc={logIn(state.email, state.password, cb)}>
      <div className="mb-6">
        <EmailInput
          onChange={handleInputChange}
          value={state.email}
          name={'email'}
        />
      </div>
      <div className="mb-6">
        <PasswordInput
          onChange={handleInputChange}
          value={state.password}
          name={'password'}
        />
      </div>
      {logInFailed && logInFailedMessage !== '' ? 
        <p className="text text_type_main-medium text_color_inactive mb-5">
          {logInFailedMessage.charAt(0).toUpperCase() + logInFailedMessage.slice(1)}
        </p>
        :
        <></>
      }
      <div className="mb-20">
        <Button type="primary" size="medium">
          Войти
        </Button>
      </div>
      <SpanWithLink
        buttonText="Зарегистрироваться"
        link="/register"
        spanText="Вы — новый пользователь?"
        mb="4"
      />
      <SpanWithLink
        buttonText="Восстановить пароль"
        link="/forgot-password"
        spanText="Забыли пароль?"
        mb="0"
      />
    </FormWrapper>
  )
}