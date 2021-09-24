import { FC, ReactNode, UIEvent } from 'react';
import { useDispatch } from 'react-redux';

import styles from './form-wrapper.module.css';

type TFormWrapper = {
  actionFunc: Function | undefined,
  children: ReactNode,
  title?: string,
  validateFunc: Function | undefined,
}

export const FormWrapper: FC<TFormWrapper> = ({ actionFunc, children, title, validateFunc }) => {
  const dispatch = useDispatch();

  const onSubmit = (e: UIEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (actionFunc) {
      dispatch(actionFunc);
    }
    else if (validateFunc) {
      validateFunc();
    }
  }

  return (
    <div className={ styles.wrapper }>
      <div className={ styles.container }>
        {title ? <h1 className="text text_type_main-medium mb-6">{title}</h1> : null}
        <form className={ styles.form } onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  )
}
