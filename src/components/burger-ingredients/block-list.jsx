import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';

export const BlockList = ({ children }) => {
  return (
    <ul className={`${styles.block_list} ml-4`}>
      {children}
    </ul>
  );
}

BlockList.propTypes = {
  children: PropTypes.array.isRequired
}