import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './element-with-icon.module.css';

const ElementWithIcon = (props) => {
  return (
    <NavLink
        to={{ pathname: props.link }}
        className={ styles.menu_item }
        activeClassName={ styles.menu_item_active }
      >
      <div className={`pr-5 pl-5 ${styles.link}`}>
        <div className={ styles.link_icon }>{props.icon}</div>
        {props.text && <span className={`text text_type_main-default pl-2 ${props.type}`}>{props.text}</span>}
      </div>
    </NavLink>
  );
}

ElementWithIcon.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string,
  type: PropTypes.string
}

export default ElementWithIcon