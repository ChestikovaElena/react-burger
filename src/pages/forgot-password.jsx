import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import FormWrapper from '../components/form-wrapper';
import SpanWithLink from '../components/span-with-link';
import { resetPassword } from '../services/actions/user';
import Preloader from '../components/preloader';
import { validateEmail } from '../utils/validate-email';

export const ForgotPasswordPage = () => {
  const { forgotPasswordRequest } = useSelector((state) => ({
    gorgotPasswordRequest: state.user.gorgotPasswordRequest
  }));

  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: ''
  });

  const [errorText, setErrorText] = useState('');

  const handleInputChange = (e) => {
    const target = e.target;
    setState({
      ...state,
      [target.name]: target.value
    });
  }

  const validate = () => {
    if (validateEmail((state.email))) {
      dispatch(resetPassword(state.email));
    }
    else {
      setErrorText('Введите корректный email')
    }
  }

  if (localStorage.getItem('forgotPasswordSuccess')) {
    return (
      <Redirect to={{ pathname: '/reset-password' }} />
    )
  }

  return (
    forgotPasswordRequest ?
      <Preloader />
    : 
      <FormWrapper
        title="Восстановление пароля"
        validateFunc={validate}
      >
        <div className="mb-6">
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={handleInputChange}
            icon={null}
            value={state.email}
            name={'email'}
            error={errorText === '' ? false : true}
            errorText={errorText}
            size={'default'}
          />
        </div>
        <div className="mb-20">
          <Button type="primary" size="medium">
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