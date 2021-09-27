import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';

import {
  Button,
  Input,
  EmailInput,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import FormWrapper from '../form-wrapper';
import Preloader from '../preloader';
import { getUserData, patchUserData } from '../../services/actions/user';
import styles from './profile-form.module.css';

export const ProfileForm = () => {
  const dispatch = useDispatch();
  const { user, userDataRequest, userDataFailed, userDataFailedMessage, refreshTokenFailed } = useSelector((state) => ({
    user: state.user.user,
    userDataRequest: state.user.userDataRequest,
    userDataFailed: state.user.userDataFailed,
    userDataFailedMessage: state.user.userDataFailedMessage,
    refreshTokenFailed: state.user.refreshTokenFailed
  }));
  
  const inputRef = useRef<any>(null);

  useEffect(
    () => {
      if (!user.name) dispatch(getUserData());
    },
    [dispatch]
  );

  type TState = {
    name: string,
    email: string,
    password: string,
  }

  const [state, setState] = useState<TState>({
    name: '',
    email: '',
    password: ''
  });

  type TPayload = {
    name?: string,
    email?: string,
    password?: string,
  }

  const [payload, setPayload] = useState<TPayload>({});

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

  useEffect(
    () => {
      let payload = {};
      if (state.password !== '') {
        payload = {
          ...payload,
          password: state.password
        }
      }
      if (user.name !== state.name && state.name !== '') {
        payload = {
          ...payload,
          name: state.name
        }
      }
      if (user.email !== state.email && state.email !== '') {
        payload = {
          ...payload,
          email: state.email
        }
      }
      setPayload(payload);
    },
    [state]
  )

  const handleInputChange: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setState({
      ...state,
      [target.name]: target.value
    })
  }

  const onIconClick = () => {
    if (inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 0)
    }
    setDisabled(false);
  }

  const onBlur = () => {
    setDisabled(true);
  }

  const onCancelHandler = () => {
    setState({
      ...state,
      name: user.name,
      email: user.email,
      password: ''
    });
  }

  return (
    <>
      {userDataRequest ? 
        refreshTokenFailed ? (
          <div className="text text_type_main-default text_color_inactive mr-2">
            Перезагрузите страницу
          </div>
        ) : (
        <Preloader />
      ) : (
        <FormWrapper actionFunc={patchUserData(payload)} validateFunc={undefined}>
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
          {userDataFailed && userDataFailedMessage !== '' ? 
            <p className="text text_type_main-medium text_color_inactive mb-5">
              {userDataFailedMessage.charAt(0).toUpperCase() + userDataFailedMessage.slice(1)}
            </p>
            :
            <></>
          }
          <div className={`mb-20 ${styles.row}`}>
            <Button type="primary" size="medium">
              Сохранить
            </Button>
            <Button type="primary" size="medium" onClick={onCancelHandler}>
              Отменить
            </Button>
          </div>
        </FormWrapper>
      )}
    </>
  )
}