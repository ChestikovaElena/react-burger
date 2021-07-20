import styles from './element-with-icon.module.css';
import PropTypes from 'prop-types';

const ElementWithIcon = (props) => {
  return (
    <div className="pt-5 pr-5 pb-5 pl-5">
      <a href="#" className={styles.link}>
        <div>{props.icon}</div>
        <span className={`text text_type_main-default pl-2 ${props.type}`}>{props.text}</span>
      </a>
    </div>
  );
}

ElementWithIcon.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string,
  type: PropTypes.string
}

export default ElementWithIcon