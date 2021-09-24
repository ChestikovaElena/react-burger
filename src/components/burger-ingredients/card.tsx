import { FC } from 'react';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

import styles from './burger-ingredients.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TCardProps = {
  id: string,
  name: string,
  price: number,
  image: string,
  count: number,
  type: string,
}

export const Card: FC<TCardProps> = ({ id, image, name, price, count, type }) =>{
  const location = useLocation();
  type TObject = object;
  
  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: { id, type },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0 : 1,
  })
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
        <img src={image} alt={name} width="240" height="120"/>
        <div className={`${styles.item_row} pt-1 pb-1`}>
          <span className="text text_type_digits-default pr-2">{price}</span>
          <CurrencyIcon type='primary' />
        </div>
        <h4 className={`${styles.item_title} text text_type_main-default`}>{name}</h4>
      </div>
    </Link>
  );
}
