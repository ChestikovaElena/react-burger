import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import {
  Button,
  Input,
  EmailInput,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import FormWrapper from '../form-wrapper';
import SpanWithLink from '../span-with-link';
import { registrate } from '../../services/actions/user.ts';

export const RegistrationForm = () => {
  const { registrateFailed, registrateFailedMessage } = useSelector((state) => ({
    registrateFailed: state.user.registrateFailed,
    registrateFailedMessage: state.user.registrateFailedMessage,
  }));
  const history = useHistory();
  const location = useLocation();

  const [state, setState] = useState({
    name: '',
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
    <FormWrapper
      title="Вход"
      actionFunc={registrate(state.email, state.password, state.name, cb)}
    >
      <div className="mb-6">
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleInputChange}
          icon={null}
          value={state.name}
          name={'name'}
          error={false}
          errorText={''}
          size={'default'}
        />
      </div>
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
      {registrateFailed && registrateFailedMessage !== '' ? 
        <p className="text text_type_main-medium text_color_inactive mb-5">
          {registrateFailedMessage.charAt(0).toUpperCase() + registrateFailedMessage.slice(1)}
        </p>
        :
        <></>
      }
      <div className="mb-20">
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </div>
      <SpanWithLink
        buttonText="Войти"
        link="/login"
        spanText="Уже зарегистрированы?"
        mb="0"
      />
    </FormWrapper>
  )
}