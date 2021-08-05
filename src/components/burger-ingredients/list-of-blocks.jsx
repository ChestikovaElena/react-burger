import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';

export const ListOfBlocks = ({ children }) => {
  return (
    <div className={ `mt-10 pr-2 ${styles.blocks_container}` }>
      <ul className={`${styles.blocks_list}`}>
        {children}
      </ul>
    </div>
  );
}

ListOfBlocks.propTypes = {
  children: PropTypes.array.isRequired
}
