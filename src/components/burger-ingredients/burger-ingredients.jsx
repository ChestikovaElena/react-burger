import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './burger-ingredients.module.css';
import Modal from '../modal';
import IngredientDetails from '../ingredient-details';
import { Tabs } from './tabs';
import { Block } from './block';
import { ListOfBlocks } from './list-of-blocks';
import { typeOfIngredients } from './type-of-ingredients';
import { getIngredients } from '../../services/actions/data';

const BurgerIngredients = ({ upgradeDataSelected }) => {
  const dispatch = useDispatch();
  const {
    data,
    dataRequest,
    dataFailed
  } = useSelector(state => state.data);

  useEffect(
    () => {
      if (!data.length) dispatch(getIngredients());
    },
    [dispatch]
  );

  const [isModalActive, setModalActive] = useState(false);
  const [ingredientData, setIngredientData] = useState();

  const getIngredientDetails = (id) => {
    return data.find(item => item._id === id);
  }

  const handleCardClick = (e) => {
    const parentNode = e.currentTarget;
    const currentIngredient = 
      getIngredientDetails(parentNode.getAttribute('data-id'));

    // let newDataSelected = dataSelected;
    // if (currentIngredient.type !== 'bun') {
    //   newDataSelected.push(currentIngredient)
    // } else {
      
    // }
    console.log(currentIngredient);
    upgradeDataSelected(currentIngredient);
    
    setIngredientData({
      image: currentIngredient.image_large,
      name: currentIngredient.name,
      calories: currentIngredient.calories,
      proteins: currentIngredient.proteins,
      fat: currentIngredient.fat,
      carbohydrates: currentIngredient.carbohydrates,
    });
    
    setModalActive(true);
  }

  const content = useMemo(
    () => {
      return dataRequest ? (
        <div className="text text_type_main-large">Подождите. Ингредиенты загружаются...</div>
      ) : (
        <>
          <h2 className='text text_type_main-large pb-5'>Соберите бургер</h2>
          <Tabs/>
          <ListOfBlocks>
            {typeOfIngredients.map(
              (item,index) =>
                <Block key={`block${index}`} type={item.type} name={item.name} data={data} handleClick={handleCardClick}/>
            )}
          </ListOfBlocks>
        </>
      );
    },
    [dataRequest, data]
  );

  return (
    <>
      <section className={`${styles.column} pt-10 mr-10`}>
        {content}
      </section>
      {isModalActive &&
        <Modal setModalActive={setModalActive} title='Детали ингредиента'>
          <IngredientDetails ingredientData={ingredientData}/>
        </Modal>
      }
    </>
  );
}

export default BurgerIngredients