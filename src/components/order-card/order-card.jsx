import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import IngredientIcon from '../ingredient-icon';
import { IngredientList } from './ingredient-list';
import TotalPrice from "../total-price";
import { getDate } from '../../utils/get-date';
import styles from './order-card.module.css';

export const OrderCard = ({ orderInfo }) => {
  const { createdAt, _id, ingredients, name, number } = orderInfo;
  
  const location = useLocation();
  // let viewIndex = 0;
  
  const totalPrice = useMemo(
    ()=> {
      if (ingredients && ingredients.length) {
        return ingredients.reduce(
            (sum, item) => (sum + item.price * item.count), 0
          );
      }
    },
    [ingredients]
  );

  // const date = getDate(createdAt);

  const content = useMemo(
    () => {
      return (
        ingredients && <IngredientList>
          {ingredients
            .map(
            (item, index) =>
              <IngredientIcon
                key={`${item.id}`}
                item={item}
                index={index}
                count={item.count === 1 ? null : item.count}
                type="shift"
                // viewIndex={viewIndex++}
              />
            )
          }
        </IngredientList>
      )
    },
    [ingredients]
  )
  return (
    <Link
      key={_id}
      to={{
        pathname: `/feed/${_id}`,
        state: { background: location }
      }}
      className={styles.link}
    >
      <div className={`pt-6 pr-6 pb-6 pl-6 ${styles.card_wrapper}`}>
        <div className={`mb-6 ${styles.card_row}`}>
          <span className="text text_type_digits-default">{`#${number}`}</span>
          <span className="text text_type_main-default text_color_inactive">
            {createdAt}
          </span>
        </div>
        <h3 className="text text_type_main-medium mb-6">{name}</h3>
        <div className={`${styles.card_row} ${styles.card_row_big}`}>
          {content}
          <TotalPrice totalPrice={totalPrice} type="def"/>
        </div>
      </div>
    </Link>
  )
}