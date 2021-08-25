import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import FormWrapper from '../form-wrapper';
import { getUserData } from '../../services/actions/auth';

export const ProfileForm = () => {
  const dispatch = useDispatch();
  const { user, userDataRequest, userDataFailed } = useSelector((state) => ({
    user: state.auth.user,
    userDataRequest: state.auth.userDataRequest,
    userDataFailed: state.auth.userDataFailed,
  }));

  useEffect(
    () => {
      if (!user.length) dispatch(getUserData());
    },
    [dispatch]
  );

  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(
    () => {
      setState({
        ...state,
        name: user.name,
        email: user.email
      });
    },
    [user]
  );

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