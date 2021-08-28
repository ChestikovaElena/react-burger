import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './nav-item.module.css';
import { logOut } from '../../services/actions/auth';

export const NavItem = ({ children, link, isLogOut }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (isLogOut) {
      dispatch(logOut())
    };
  }

  return (
    <NavLink
      to={{ pathname: link }}
      className={`text text_type_main-medium text_color_inactive ${styles.item}`}
      activeClassName={`text text_type_main-medium ${styles.item_active}`}
      onClick={handleClick}
    >
      {children}
    </NavLink>
  );
}

NavItem.propTypes = {
  children: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
  isLogOut: PropTypes.bool
}
