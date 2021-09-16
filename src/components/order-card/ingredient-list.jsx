import PropTypes from 'prop-types';

import styles from './order-card.module.css';

export const IngredientList = ({ children }) => {
  return (
    <ul className={`mr-6 ${styles.card_list} `}>
      {children}
    </ul>
  )
}