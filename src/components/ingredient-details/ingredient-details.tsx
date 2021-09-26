import { useEffect, useState } from 'react';
import { useSelector } from '../../services/hooks';
import { useParams } from 'react-router-dom';

import { productFeatures, Feature, ListOfFeatures } from './feature';
import Preloader from '../preloader';
import { TIngredientInUpdateOrder, TIngredient } from '../../services/types/data';

const IngredientDetails = () => {
  const { data } = useSelector((state) => ({
    data: state.data.data
  }));

  const { ingredientId } = useParams<{ingredientId: string}>();
  const [ingredientData, setIngredientData] = useState<TIngredient | null>(null);
  const [error, setError] = useState<boolean>(false);

  const getIngredientInfo = async () => {
    return await [...data].filter(item => item._id === ingredientId);
  }

  useEffect( () => {
    async function getIngredient() {
      let soughtIngredient: TIngredient[] | null = null;
      let ingredientDataValue: TIngredient | null = null;
      let errorValue = false;

      if (data.length) {
        soughtIngredient = await getIngredientInfo();

        if (soughtIngredient && soughtIngredient.length) {
          ingredientDataValue = soughtIngredient[0];
        } else {errorValue = true};
      }
      
      setIngredientData(ingredientDataValue);
      setError(errorValue);
    };
    getIngredient();
  },
    [ingredientId, data]
  );

  function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
  }
  
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
            <ListOfFeatures>
              {productFeatures
              .map( item => 
                <Feature
                  key={item.id}
                  name={item.name}
                  measure={item.measure}
                  value={getProperty(ingredientData, item.valueName)}
                />
              )}
            </ListOfFeatures>
          </>
          )
        )
      }
    </>
  );
}

export default IngredientDetails;