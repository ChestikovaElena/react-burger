import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { productFeatures, Feature, ListOfFeatures } from './feature';
import Preloader from '../preloader';

const IngredientDetails = ({ ingredientDataFromPage }) => {
  let { ingredientData } = useSelector((state) => ({
    ingredientData: state.ingredient.ingredientData
  }));
  
  if (ingredientDataFromPage) ingredientData = ingredientDataFromPage;

  const content = useMemo(
    () => {
      return !ingredientData ? (
        <Preloader />
      ) : (
        <>
          <img src={ingredientData.image_large} alt={ingredientData.name} className='mb-4'/>
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
    <>
      {content}
    </>
  );
}

export default IngredientDetails;