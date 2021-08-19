import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormWrapper from '../form-wrapper';

export const LoginForm = () => {
  return (
    <FormWrapper title="Вход">
      <Button type="primary" size="medium">Войти</Button>
    </FormWrapper>
  )
}