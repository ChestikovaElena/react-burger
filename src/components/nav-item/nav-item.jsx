import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './nav-item.module.css';
import { logOut } from '../../services/actions/auth';

export const NavItem = ({ text, link }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (text='Выход') dispatch(logOut());
  }

  return (
    <li className={`${styles.wrapper}`}>
      <NavLink
        to={{ pathname: link }}
        className={`text text_type_main-medium text_color_inactive ${styles.item}`}
        activeClassName={`text text_type_main-medium ${styles.item_active}`}
        onClick={handleClick}
      >
        {text}
      </NavLink>
    </li>
  );
}

NavItem.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string,
}
