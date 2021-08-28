import PropTypes from 'prop-types';
import styles from './element-with-icon.module.css';

const ElementWithIcon = (props) => {
  return (
    <div className={`pr-5 pl-5 ${styles.link}`}>
      <div className={ styles.link_icon }>{props.icon}</div>
      {props.text && <span className={`text text_type_main-default pl-2 ${props.type}`}>{props.text}</span>}
    </div>
  );
}

ElementWithIcon.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string,
  type: PropTypes.string
}

export default ElementWithIcon