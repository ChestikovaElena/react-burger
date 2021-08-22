import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import FormWrapper from '../form-wrapper';
import SpanWithLink from '../span-with-link';
import { logIn } from '../../services/actions/auth';

export const LoginForm = () => {
  const dispatch = useDispatch();

  const { accessToken } = useSelector((state) => ({
    accessToken: state.auth.accessToken
  }))

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

  const onIconClick = (e) => {
    console.log('Нажали на иконку');
  }

  const handleClickLogIn = useCallback(
    e => {
      e.preventDefault();
      dispatch(logIn(state.email, state.password));
    },
    [state, dispatch]
  );

  if (accessToken!=='') {
    return (
      <Redirect to={{ pathname: '/' }} />
    )
  }

  return (
    <FormWrapper title="Вход">
      <div className="mb-6">
        <Input
        className='mb-6'
          type={'email'}
          placeholder={'E-mail'}
          onChange={handleInputChange}
          icon={null}
          value={state.email}
          name={'email'}
          error={false}
          errorText={''}
          size={'default'}
        />
      </div>
      <div className="mb-6">
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={handleInputChange}
          icon={'ShowIcon'}
          value={state.password}
          name={'password'}
          error={false}
          onIconClick={onIconClick}
          errorText={''}
          size={'default'}
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