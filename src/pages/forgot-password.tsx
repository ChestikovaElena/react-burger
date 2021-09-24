import { useState } from 'react';
import { useDispatch, useSelector } from '../services/hooks';
import { Redirect } from 'react-router-dom';

import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import FormWrapper from '../components/form-wrapper';
import SpanWithLink from '../components/span-with-link';
import { resetPassword } from '../services/actions/user';
import Preloader from '../components/preloader';
import { validateEmail } from '../utils/validate-email';
import styles from './login.module.css';

export const ForgotPasswordPage = () => {
  const { forgotPasswordRequest } = useSelector((state) => ({
    forgotPasswordRequest: state.user.forgotPasswordRequest
  }));

  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: ''
  });

  const [errorText, setErrorText] = useState('');

  const handleInputChange: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      (<Preloader />)
    :
      (<div className={ styles.wrapper }>
        <div className={ styles.content }>
          <FormWrapper
            title="Восстановление пароля"
            validateFunc={validate}
            actionFunc={undefined}
          >
            <div className="mb-6">
              <Input
                type={'email'}
                placeholder={'Укажите e-mail'}
                onChange={handleInputChange}
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
        </div>
      </div>)
  )
}