import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import styles from './form-wrapper.module.css';

export const FormWrapper = ({ actionFunc, children, title }) => {
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(actionFunc);
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

FormWrapper.propTypes = {
  actionFunc: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string
}