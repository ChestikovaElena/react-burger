import { useState } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import FormWrapper from '../form-wrapper';
import SpanWithLink from '../span-with-link';

export const RegistrationForm = () => {
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

  const onIconClick = (e) => {
    console.log('Нажали на иконку');
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
        <Input
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