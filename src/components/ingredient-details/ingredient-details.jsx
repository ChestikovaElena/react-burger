import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styles from './ingredient-details.module.css';
import { productFeatures, Feature, ListOfFeatures } from './feature';

const IngredientDetails = () => {
  const { ingredientData } = useSelector((state) => ({
    ingredientData: state.ingredient.ingredientData
  }));

  const content = useMemo(
    () => {
      return !ingredientData ? (
        <div className="text text_type_main-medium mb-8">Подождите. Информация загружается...</div>
      ) : (
        <>
          <img src={ingredientData.image} alt={ingredientData.name} className='mb-4'/>
          <h3 className='text text_type_main-medium mb-8'>{ingredientData.name}</h3>
          <ListOfFeatures
            children =
              {productFeatures.map(
                item =>
                <Feature key={item.id} name={item.name} measure={item.measure} value={ingredientData[item.valueName]}/>
              )}
          />
        </>
      )
    },
    [ingredientData]
  );

  return (
    <div className={styles.wrapper}>
      {content}
    </div>
  );
}

export default IngredientDetails;