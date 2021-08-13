import { useEffect, useMemo, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './burger-ingredients.module.css';
import Modal from '../modal';
import IngredientDetails from '../ingredient-details';
import { Tabs } from './tabs';
import { Block } from './block';
import { ListOfBlocks } from './list-of-blocks';
import { typeOfIngredients } from './type-of-ingredients';
import { getIngredients } from '../../services/actions/data';
import { 
  ADD_INGREDIENT_DATA,
  DELETE_INGREDIENT_DATA,
} from '../../services/actions/ingredient-details';

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const { data, dataRequest, dataFailed } = useSelector((state) => ({
    data: state.data.data,
    dataRequest: state.data.dataRequest,
    dataFailed: state.data.dataFailed,
  }));
  
  useEffect(
    () => {
      if (!data.length) dispatch(getIngredients());
    },
    [dispatch]
  );

  const [isModalActive, setModalActive] = useState(false);

  useEffect(
    () => {
      if (!isModalActive) {dispatch({ type: DELETE_INGREDIENT_DATA });};
    },
    [isModalActive]
  );

  const handleCardClick = (e) => {
    const parentNode = e.currentTarget;
    const id = parentNode.getAttribute('data-id');
    const ingredientData = [...data].filter(item => item._id === id)&&
      [...data].filter(item => item._id === id)[0];
    dispatch({
      type: ADD_INGREDIENT_DATA,
      ingredientData
    });
    setModalActive(true);
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