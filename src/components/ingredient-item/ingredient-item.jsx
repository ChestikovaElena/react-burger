import IngredientIcon from "../ingredient-icon";
import styles from "./ingredient-item.module.css";

export const IngredientItem = ({ index, item }) => {
  
  return (
    <li className={`mb-4 ${styles.item}`}>
      <IngredientIcon
        id={item}
        index={index}
        type="full"
      />
      {/* <h5>{ingredientData.name}</h5>
      <div>
        <TotalPrice totalPrice={`1 x ${ingredientData.price}`} type="def"/>
      </div> */}
    </li>
  )
}