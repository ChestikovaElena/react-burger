import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';
import styles from './nav-item.module.css';

export const NavItem = ({ children, link}) => {
  return (
    <NavLink
      exact
      to={{ pathname: link }}
      className={`text text_type_main-medium text_color_inactive ${styles.item}`}
      activeClassName={`text text_type_main-medium ${styles.item_active}`}
    >
      {children}
    </NavLink>
  );
}

NavItem.propTypes = {
  children: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired
}
