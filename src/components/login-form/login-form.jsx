import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import FormWrapper from '../form-wrapper';
import SpanWithLink from '../span-with-link';
import { logIn } from '../../services/actions/auth';

export const LoginForm = ({ isLoggedIn }) => {
  const dispatch = useDispatch();
  
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

  const handleClickLogIn = useCallback((e) => {
    e.preventDefault();
    const { from } = (location.state) || { from: { pathname: "/" } };
    const cb = () => {
      history.replace(from);
    };
    dispatch(logIn(state.email, state.password, cb));
  },
    [logIn, state, history, location]
  );

  return (
    <FormWrapper title="Вход">
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
      <div className="mb-20">
        <Button type="primary" size="medium" onClick={handleClickLogIn}>
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