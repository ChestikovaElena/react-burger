import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Input,
  EmailInput,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import FormWrapper from '../form-wrapper';
import { getUserData, patchUserData } from '../../services/actions/auth';

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

  const handleClickSave = (e) => {
    e.preventDefault();
    let payload = {};
    if (state.password !== '') {
      payload = {
        name: state.name,
        email: state.email,
        password: state.password
      }
    } else {
      payload = {
        name: state.name,
        email: state.email,
      }
    }
      dispatch(patchUserData(payload));
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
      <div className="mb-20">
        <Button type="primary" size="medium" onClick={handleClickSave}>
          Сохранить
        </Button>
      </div>
    </FormWrapper>
  )
}