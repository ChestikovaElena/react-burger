import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const Card = ({ id, image, name, price, type, count, handleClick }) =>{
  return (
    <li
      className={ `${styles.block_item} mb-8` }
      data-id={id} data-type={type} onClick={handleClick}>
      <Counter count={count} size="default" />
      <div>
        <img src={image} alt={name}/>
      </div>
      <div className={`${styles.item_row} pt-1 pb-1`}>
        <span className="text text_type_digits-default pr-2">{price}</span>
        <CurrencyIcon type='primary' />
      </div>
      <h4 className={`${styles.item_title} text text_type_main-default`}>{name}</h4>
    </li>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
}