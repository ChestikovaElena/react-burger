import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Input,
  EmailInput,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import FormWrapper from '../form-wrapper';
import SpanWithLink from '../span-with-link';
import { registrate } from '../../services/actions/user';

export const RegistrationForm = () => {
  const dispatch = useDispatch();
  const { registrateFailed, registrateFailedMessage } = useSelector((state) => ({
    registrateFailed: state.user.registrateFailed,
    registrateFailedMessage: state.user.registrateFailedMessage,
  }));

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

  const handleClickRegistrate = e => {
    e.preventDefault();
    dispatch(registrate(state.email, state.password, state.name));
  }
  
  return (
    <FormWrapper title="Вход">
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
        <Button type="primary" size="medium" onClick={handleClickRegistrate}>
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