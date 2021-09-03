import PropTypes from 'prop-types';

import styles from './menu.module.css';

const Menu = ({ children, style }) => {
  return (
    <nav className={ styles.menu }>
      <ul className=
        { style === 'row' ? styles.menu_row : styles.menu_column }>
        {children}
      </ul>
    </nav>
  );
}

Menu.propTypes = {
  children: PropTypes.array.isRequired,
  style: PropTypes.string.isRequired
}

export default Menu