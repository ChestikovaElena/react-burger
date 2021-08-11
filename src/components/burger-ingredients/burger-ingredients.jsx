import { useEffect, useMemo, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './burger-ingredients.module.css';
import Modal from '../modal';
import IngredientDetails from '../ingredient-details';
import { Tabs } from './tabs';
import { Block } from './block';
import { ListOfBlocks } from './list-of-blocks';
import { typeOfIngredients } from './type-of-ingredients';
import { getIngredients } from '../../services/actions';
import { ADD_INGREDIENT_DATA, ADD_SELECTED_INGREDIENT } from '../../services/actions';

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
    dispatch({
      type: ADD_SELECTED_INGREDIENT,
      id
    });
  }

  const refContainer = useRef(null);
  const refBun = useRef(null);
  const refSauce = useRef(null);
  const refMain = useRef(null);

  const [current, setCurrent] = useState('bun');
  const scrollHendler = (e) => {
    const currentTab =
      refContainer.current.scrollTop-refBun.current.clientHeight<0 ? 'bun'
      :
        refContainer.current.scrollTop-refBun.current.clientHeight-refSauce.current.clientHeight<0 ? 'sauce'
        : 'main';
    setCurrent(currentTab);
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
            <Tabs current={current} setCurrent={setCurrent}/>
            <ListOfBlocks
              refContainer={refContainer}
              scrollHendler={scrollHendler}
            >
              {typeOfIngredients.map(
                (item, index) =>
                  <Block
                    key={`block${index}`}
                    type={item.type}
                    name={item.name}
                    data={data}
                    handleClick={handleCardClick}
                    refBun={refBun}
                    refSauce={refSauce}
                    refMain={refMain}
                  />
              )}
            </ListOfBlocks>
          </>
        )
      )
    },
    [dataRequest, data, current]
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