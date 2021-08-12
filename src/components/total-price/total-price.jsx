import PropTypes from 'prop-types';
import { CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './total-price.module.css';

export const TotalPrice = ({totalPrice}) => {
  return (
    <div className={ `${styles.total} pr-10`}>
      <span className="text text_type_digits-medium pr-2">{totalPrice}</span>
      <div className= { styles.icon }>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  )
}

TotalPrice.propTypes = {
  totalPrice: PropTypes.number.isRequired,
}