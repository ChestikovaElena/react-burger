import { useState } from 'react';
import { useSelector } from '../../services/hooks';
import { useHistory, useLocation } from 'react-router-dom';

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
  const { registrateFailed, registrateFailedMessage } = useSelector((state) => ({
    registrateFailed: state.user.registrateFailed,
    registrateFailedMessage: state.user.registrateFailedMessage,
  }));
  interface LocationState {
    from: {
      pathname: string;
    };
  }
  const history = useHistory();
  const location = useLocation<LocationState>();

  type TUserState = {
    name: string,
    email: string,
    password: string,
  }

  const [state, setState] = useState<TUserState>({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      validateFunc={undefined}
    >
      <div className="mb-6">
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleInputChange}
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