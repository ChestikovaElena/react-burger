import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import FormWrapper from '../components/form-wrapper';
import SpanWithLink from '../components/span-with-link';
import { resetPassword, registrate } from '../services/actions/auth';

export const ForgotPasswordPage = () => {
  const {isResetPassword, resetPasswordRequest, resetPasswordFailed } = useSelector((state) => ({
    isResetPassword: state.auth.isResetPassword,
    resetPasswordRequest: state.auth.resetPasswordRequest,
    resetPasswordFailed: state.auth.resetPasswordFailed,
  }));

  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: ''
  });

  const handleInputChange = (e) => {
    const target = e.target;
    setState({
      ...state,
      [target.name]: target.value
    });
  }

  const resetPasswordClick = e => {
    e.preventDefault();
    dispatch(registrate(state.email, "111", "4"));
    dispatch(resetPassword(state.email));
  }

  if (isResetPassword) {
    return (
      <Redirect to={{ pathname: '/reset-password' }} />
    )
  }

  return (
    <FormWrapper title="Восстановление пароля">
      <div className="mb-6">
        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={handleInputChange}
          icon={null}
          value={state.email}
          name={'email'}
          error={false}
          errorText={''}
          size={'default'}
        />
      </div>
      <div className="mb-20">
        <Button type="primary" size="medium" onClick={resetPasswordClick}>
          Восстановить
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