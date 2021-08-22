import styles from './menu.module.css';
import PropTypes from 'prop-types';

const Menu = (props) => {
  return (
    <nav className={ styles.menu }>
      <ul className=
        { props.style === 'row' ? styles.menu_row : styles.menu_column }>
        {props.children}
      </ul>
    </nav>
  );
}

Menu.propTypes = {
  children: PropTypes.array.isRequired,
  style: PropTypes.string.isRequired
}

export default Menu