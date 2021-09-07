import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { productFeatures, Feature, ListOfFeatures } from './feature';
import Preloader from '../preloader';

const IngredientDetails = () => {
  const { data } = useSelector((state) => ({
    data: state.data.data
  }));

  const { ingredientId } = useParams();
  const [ingredientData, setIngredientData] = useState(null);
  const [error, setError] = useState(false);

  const getIngredientInfo = async () => {
    return await [...data].filter(item => item._id === ingredientId);
  }

  useEffect(
    async () => {
      let soughtIngredient = null;
      let ingredientDataValue = null;
      let errorValue = false;

      if (data.length) {
        soughtIngredient = await getIngredientInfo();

        if (soughtIngredient && soughtIngredient.length) {
          ingredientDataValue = soughtIngredient[0];
        } else {errorValue = true};
      }
      
      setIngredientData(ingredientDataValue);
      setError(errorValue);
    },
    [ingredientId, data]
  );
  
  return (
    <>
      {error ? (
          <p className='text text_type_main-medium text_color_inactive mt-8'>Ингредиент с таким ID не найден</p>
        ) : (
          ingredientData === null ? (
            <Preloader />
          ) : (
          <>
            <img
              src={ingredientData.image_large}
              alt={ingredientData.name}
              className="mb-4"
              width="520"
              height="240"
            />
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
        )
      }
    </>
  );
}

// IngredientDetails.propTypes = {
//   ingredientDataFromPage: PropTypes.shape({
//     image_large: PropTypes.string,
//     name: PropTypes.string,
//     calories: PropTypes.number,
//     proteins: PropTypes.number,
//     fat: PropTypes.number,
//     carbohydrates: PropTypes.number
//   })
// }

export default IngredientDetails;