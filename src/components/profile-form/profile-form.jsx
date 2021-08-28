import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Input,
  EmailInput,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import FormWrapper from '../form-wrapper';
import Preloader from '../preloader';
import { getUserData, patchUserData } from '../../services/actions/auth';

export const ProfileForm = () => {
  const dispatch = useDispatch();
  const { user, userDataRequest } = useSelector((state) => ({
    user: state.auth.user,
    userDataRequest: state.auth.userDataRequest
  }));

  const inputRef = useRef(null);

  useEffect(
    () => {
      if (!user.length) dispatch(getUserData());
    },
    [dispatch, user.length]
  );

  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [disabled, setDisabled] = useState(true);

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

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    setDisabled(false);
  }

  const onBlur = () => {
    setDisabled(true);
  }

  const handleClickSave = (e) => {
    e.preventDefault();
    let payload = {};
    if (state.password !== '') {
      payload = {
        ...payload,
        password: state.password
      }
    }
    if (user.name !== state.name) {
      payload = {
        ...payload,
        name: state.name
      }
    }
    if (user.email !== state.email) {
      payload = {
        ...payload,
        email: state.email
      }
    }
    dispatch(patchUserData(payload));
  }

  return (
    <>
      {userDataRequest ? (
        <Preloader />
      ) : (
        <FormWrapper>
          <div className="mb-6">
            <Input
              disabled={disabled}
              type={'text'}
              placeholder={'Имя'}
              onChange={handleInputChange}
              icon={'EditIcon'}
              value={state.name}
              name={'name'}
              error={false}
              ref={inputRef}
              onIconClick={onIconClick}
              errorText={''}
              size={'default'}
              onBlur={onBlur}
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
      )}
    </>
  )
}