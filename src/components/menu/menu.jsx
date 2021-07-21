import styles from './menu.module.css';
import PropTypes from 'prop-types';

const Menu = (props) => {
  return (
    <nav className={ styles.menu }>
      <ul className={ styles.menu_list }>
        {props.children}
      </ul>
    </nav>
  );
}

Menu.propTypes = {
  children: PropTypes.array.isRequired
}

export default Menu