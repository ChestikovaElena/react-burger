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
      <div className="pt-5 pr-5 pb-5 pl-5">
        <a href="#" className={ styles.link }>
          <div className={ styles.link_icon }>{props.icon}</div>
          {props.text && <span className={`text text_type_main-default pl-2 ${props.type}`}>{props.text}</span>}
        </a>
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