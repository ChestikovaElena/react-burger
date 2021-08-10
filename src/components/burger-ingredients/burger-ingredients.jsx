import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './burger-ingredients.module.css';
import Modal from '../modal';
import IngredientDetails from '../ingredient-details';
import { Tabs } from './tabs';
import { Block } from './block';
import { ListOfBlocks } from './list-of-blocks';
import { typeOfIngredients } from './type-of-ingredients';
import { getIngredients } from '../../services/actions';
import { ADD_INGREDIENT_DATA } from '../../services/actions';

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const { data, dataRequest, dataFailed } = useSelector((state) => ({
    data: state.data,
    dataRequest: state.dataRequest,
    dataFailed: state.dataFailed,
  }));
  
  useEffect(
    () => {
      if (!data.length) dispatch(getIngredients());
    },
    [dispatch]
  );

  const [isModalActive, setModalActive] = useState(false);

  const handleCardClick = (e) => {
    const parentNode = e.currentTarget;
    const id = parentNode.getAttribute('data-id');
    dispatch({
      type: ADD_INGREDIENT_DATA,
      id
    });
    setModalActive(true);
  }

  const content = useMemo(
    () => {
      return dataRequest ? (
        <div className="text text_type_main-large">Подождите. Ингредиенты загружаются...</div>
      ) : (
        dataFailed ? (
          <div className="text text_type_main-large">Произошла ошибка. Перезагрузите браузер.</div>
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
        )
      )
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
          <IngredientDetails/>
        </Modal>
      }
    </>
  );
}

export default BurgerIngredients