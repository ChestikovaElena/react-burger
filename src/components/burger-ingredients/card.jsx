import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

import styles from './burger-ingredients.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const Card = ({ id, image, name, price, count, type }) =>{
  const location = useLocation();

  const [{  },dragRef] = useDrag({
    type: 'ingredient',
    item: { id, type },
  });

  return (
    <Link
      key={id}
      to={{
        pathname: `/ingredients/${id}`,
        state: { background: location },
      }}
      className={ styles.item_link }
    >
      <div ref={dragRef}>
        <Counter count={count} size="default" />
        <div className={`&{styles.item_image-wrapper}`}>
          <img src={image} alt={name}/>
        </div>
        <div className={`${styles.item_row} pt-1 pb-1`}>
          <span className="text text_type_digits-default pr-2">{price}</span>
          <CurrencyIcon type='primary' />
        </div>
        <h4 className={`${styles.item_title} text text_type_main-default`}>{name}</h4>
      </div>
    </Link>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
}