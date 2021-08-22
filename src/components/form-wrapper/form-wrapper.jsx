import PropTypes from 'prop-types';
import styles from './form-wrapper.module.css';

export const FormWrapper = ({ title, children }) => {
  return (
    <div className={ styles.wrapper }>
      <div className={ styles.container }>
        {title ? <h1 className="text text_type_main-medium mb-6">{title}</h1> : null}
        <form className={ styles.form }>
          {children}
        </form>
      </div>
    </div>
  )
}

FormWrapper.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}