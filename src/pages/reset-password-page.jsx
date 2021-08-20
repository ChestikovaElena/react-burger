import { useState } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import FormWrapper from '../components/form-wrapper';
import SpanWithLink from '../components/span-with-link';

export const ResetPasswordPage = () => {
  const [state, setState] = useState({
    newPassword: '',
    code: ''
  });

  const handleInputChange = (e) => {
    const target = e.target;
    setState({
      ...state,
      [target.name]: target.value
    });
  }

  return (
    <FormWrapper title="Восстановление пароля">
      <div className="mb-6">
        <Input
          type={'password'}
          placeholder={'Введите новый пароль'}
          onChange={handleInputChange}
          icon={'ShowIcon'}
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