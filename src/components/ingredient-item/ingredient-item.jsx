import IngredientIcon from "../ingredient-icon";
import TotalPrice from "../total-price";
import styles from "./ingredient-item.module.css";

export const IngredientItem = ({ index, item }) => {
  
  return (
    <li className={`mb-4 ${styles.item}`}>
      <IngredientIcon
        id={item.id}
        index={index}
        item={item}
        type="full"
      />
      <h5 className={`text text_type_main-default ml-4 mr-4 ${styles.item_title}`}>{item.name}</h5>
      <div className={ styles.total }>
        <TotalPrice totalPrice={`${item.count} x ${item.price}`} type="def"/>
      </div>
    </li>
  )
}