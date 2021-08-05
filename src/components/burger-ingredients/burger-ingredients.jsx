import { useState, useContext, useMemo } from 'react';
import styles from './burger-ingredients.module.css';
import Modal from '../modal';
import IngredientDetails from '../ingredient-details';
import { Tabs } from './tabs';
import { DataContext } from '../../services/app-context';
import { Block } from './block';
import { ListOfBlocks } from './list-of-blocks';
import { typeOfIngredients } from './type-of-ingredients';


const BurgerIngredients = () => {
  const { dataState } = useContext(DataContext);
  const { data } = dataState;

  const [isModalActive, setModalActive] = useState(false);
  const [ingredientData, setIngredientData] = useState();

  const getIngredientDetails = (id) => {
    return data.find(item => item._id === id);
  }

  const handleCardClick = (e) => {
    const parentNode = e.currentTarget;
    const currentIngredient = getIngredientDetails(parentNode.getAttribute('data-id'));
    
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
    () => typeOfIngredients.map(
      (item,index) =>
        <Block key={`block${index}`} type={item.type} name={item.name} data={data} handleClick={handleCardClick}/>
    ), [data]
  );

  return (
    <>
      <section className={`${styles.column} pt-10 mr-10`}>
        <h2 className='text text_type_main-large pb-5'>Соберите бургер</h2>
        <Tabs/>
        <ListOfBlocks children = {content} />
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