import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import IngredientDetails from '../components/ingredient-details';
import Preloader from '../components/preloader';
import { getIngredients } from '../services/actions/data-ingredients';
import styles from './ingredient.module.css';

export const IngredientPage = () => {
  // const { data } = useSelector((state) => ({
  //   data: state.data.data
  // }));
  // const { ingredientId } = useParams();
  // const dispatch = useDispatch();
  // const [ingredientDataState, setIngredientData] = useState(null);

  // useEffect(
  //   () => {
  //     if (!data.length) dispatch(getIngredients());
  //     const ingredientDataValue = [...data].filter(item => item._id === ingredientId)&&
  //       [...data].filter(item => item._id === ingredientId)[0];
  //     setIngredientData(ingredientDataValue);
  //   },
  //   [ingredientId, dispatch, data]
  // );

  return (
    <div className={`mt-30 ${styles.wrapper}`}>
      <h2 className="text text_type_main-large">
        Детали ингредиента
      </h2>
      <IngredientDetails />
    </div>
  )
}