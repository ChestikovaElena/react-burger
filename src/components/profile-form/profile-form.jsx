import { useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import FormWrapper from '../form-wrapper';

export const ProfileForm = () => {
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
    console.log('Меняйте');
  }

  return (
    <FormWrapper>
      <div className="mb-6">
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleInputChange}
          icon={'EditIcon'}
          value={state.name}
          name={'name'}
          error={false}
          onIconClick={onIconClick}
          errorText={''}
          size={'default'}
        />
      </div>
      <div className="mb-6">
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={handleInputChange}
          icon={'EditIcon'}
          value={state.email}
          name={'email'}
          error={false}
          onIconClick={onIconClick}
          errorText={''}
          size={'default'}
        />
      </div>
      <div>
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={handleInputChange}
          icon={'EditIcon'}
          value={state.password}
          name={'password'}
          error={false}
          onIconClick={onIconClick}
          errorText={''}
          size={'default'}
        />
      </div>
    </FormWrapper>
  )
}