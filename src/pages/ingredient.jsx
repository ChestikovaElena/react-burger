import IngredientDetails from '../components/ingredient-details';
import styles from './ingredient.module.css';

export const IngredientPage = () => {
  
  return (
    <div className={`mt-30 ${styles.wrapper}`}>
      <h2 className="text text_type_main-large">
        Детали ингредиента
      </h2>
      <IngredientDetails />
    </div>
  )
}