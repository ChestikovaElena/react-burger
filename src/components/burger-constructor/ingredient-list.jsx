import PropTypes from 'prop-types';

import styles from './burger-constructor.module.css';

export const IngredientsList = (props) =>{
  return (
    <ul className={`${styles.ingredients_list} `}>
      {props.children}
    </ul>
  );
}

IngredientsList.propTypes = {
  children: PropTypes.node.isRequired
}