import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';

export const ListOfBlocks = ({ children, refContainer, scrollHendler }) => {
  return (
    <div
      className={ `mt-10 pr-2 ${styles.blocks_container}`}
      ref={ refContainer}
      onScroll={scrollHendler}
      data-id='container'>
      <ul className={`${styles.blocks_list}`}>
        {children}
      </ul>
    </div>
  );
}

ListOfBlocks.propTypes = {
  children: PropTypes.array.isRequired,
  refContainer: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  scrollHendler: PropTypes.func.isRequired,
}
