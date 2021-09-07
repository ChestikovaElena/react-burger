import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import IngredientIcon from '../ingredient-icon';
import { IngredientList } from './ingredient-list';
import TotalPrice from "../total-price";
import styles from './order-card.module.css';

export const OrderCard = ({ orderInfo }) => {
  const { id, number, time, title, ingredients, cost } = orderInfo;
  // const [indexesOfPaintedIngredients, setIndexes] = useState({ firstIndex: 0, lastIndex: 5 });
  const location = useLocation();
  let viewIndex = 0;

  const content = useMemo(
    () => {
      return (
        <IngredientList>
          {ingredients.filter((ingredient, index) => index <= 5)
            .map(
            (item, index) =>
              <IngredientIcon
                key={`${index}`}
                id={item}
                index={index}
                type="shift"
                // indexes={
                //   (index == 5) ? indexesOfPaintedIngredients : null
                // }
                // setIndexes={
                //   (index == 5) ? setIndexes : null
                // }
                count= {
                  (index == 5) ?
                    (ingredients.length - 5)
                  :
                    null
                }
                viewIndex={viewIndex++}
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
      key={id}
      to={{
        pathname: `/feed/${id}`,
        state: { background: location }
      }}
      className={styles.link}
    >
      <div className={`pt-6 pr-6 pb-6 pl-6 ${styles.card_wrapper}`}>
        <div className={`mb-6 ${styles.card_row}`}>
          <span className="text text_type_digits-default">{`#${number}`}</span>
          <span className="text text_type_main-default text_color_inactive">{time}</span>
        </div>
        <h3 className="text text_type_main-medium mb-6">{title}</h3>
        <div className={`${styles.card_row} ${styles.card_row_big}`}>
          {content}
          <TotalPrice totalPrice={cost} type="def"/>
        </div>
      </div>
    </Link>
  )
}