import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import FormWrapper from '../components/form-wrapper';
import SpanWithLink from '../components/span-with-link';
import { restorePassword, RESTORE_PASSWORD_RESET } from '../services/actions/user';

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const { isResetPassword } = useSelector((state) => ({
    isResetPassword: state.user.isResetPassword
  }))

  useEffect(() => {
    return () => {
      dispatch({
        type: RESTORE_PASSWORD_RESET
      })
    }
  }, []);

  const [state, setState] = useState({
    newPassword: '',
    code: ''
  });

  const [iconValue, setIcon] = useState('ShowIcon');

  const handleInputChange = (e) => {
    const target = e.target;
    setState({
      ...state,
      [target.name]: target.value
    });
  }

  const onIconClick = (e) => {
    setIcon(iconValue === 'ShowIcon' ? 'HideIcon' : 'ShowIcon');
  }
  
  if (!localStorage.getItem('forgotPasswordSuccess') && !isResetPassword) {
    return (
      <Redirect to={{ pathname: '/forgot-password' }} />
    )
  }

  if (isResetPassword) {
    localStorage.removeItem('forgotPasswordSuccess');
    return (
      <Redirect to={{ pathname: '/login' }} />
    )
  }

  return (
    <FormWrapper
      title="Восстановление пароля"
      actionFunc={restorePassword(state.newPassword, state.code)}
    >
      <div className="mb-6">
        <Input
          type={iconValue === 'ShowIcon' ? 'password' : 'text'}
          placeholder={'Введите новый пароль'}
          onChange={handleInputChange}
          icon={iconValue}
          value={state.newPassword}
          name={'newPassword'}
          error={false}
          onIconClick={onIconClick}
          errorText={''}
          size={'default'}
        />
      </div>
      <div className="mb-6">
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleInputChange}
          icon={null}
          value={state.code}
          name={'code'}
          error={false}
          onIconClick={onIconClick}
          errorText={''}
          size={'default'}
        />
      </div>
      <div className="mb-20">
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </div>
      <SpanWithLink
        buttonText="Войти"
        link="/login"
        spanText="Вспомнили пароль?"
        mb="0"
      />
    </FormWrapper>
  )
}