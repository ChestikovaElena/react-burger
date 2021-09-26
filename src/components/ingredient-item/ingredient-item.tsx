import { FC } from 'react';
import { TIngredientInUpdateOrder } from '../../services/types/data';

import IngredientIcon from "../ingredient-icon";
import TotalPrice from "../total-price";
import styles from "./ingredient-item.module.css";

type TIngredientItem = {
  index: number,
  item: TIngredientInUpdateOrder,
}

export const IngredientItem: FC<TIngredientItem> = ({ index, item }) => {
  
  return (
    <li className={`mb-4 ${styles.item}`}>
      <IngredientIcon
        index={index}
        item={item}
        type="full"
      />
      <h5 className={`text text_type_main-default ml-4 mr-4 ${styles.item_title}`}>{item.name}</h5>
      <div className={ styles.total }>
        <TotalPrice count={item.count} totalPrice={item.price} type="def"/>
      </div>
    </li>
  )
}