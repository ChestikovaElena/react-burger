import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import FormWrapper from '../components/form-wrapper';
import SpanWithLink from '../components/span-with-link';
import { restorePassword, registrate } from '../services/actions/auth';

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => ({
    token: state.auth.token
  }))

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

  const restorePasswordClick = useCallback(
    e => {
      e.preventDefault();
      dispatch(restorePassword(state.newPassword, token));
    },
    [state, dispatch]
  );

  const onIconClick = (e) => {
    console.log('Нажали на иконку');
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
        <Button type="primary" size="medium" onClick={restorePasswordClick}>
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