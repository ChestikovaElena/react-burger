import { useEffect, useCallback, useMemo, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './burger-ingredients.module.css';
import Modal from '../modal';
import IngredientDetails from '../ingredient-details';
import { Tabs } from './tabs';
import { Block } from './block';
import { ListOfBlocks } from './list-of-blocks';
import Preloader from '../preloader';
import { typeOfIngredients } from './type-of-ingredients';
import { getIngredients } from '../../services/actions/data-ingredients';
import { 
  ADD_INGREDIENT_DATA,
  DELETE_INGREDIENT_DATA,
} from '../../services/actions/ingredient-details';

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const { data, dataRequest, dataFailed, dataSelected } = useSelector((state) => ({
    data: state.data.data,
    dataRequest: state.data.dataRequest,
    dataFailed: state.data.dataFailed,
    dataSelected: state.dataSelected.dataSelected
  }));
  
  useEffect(
    () => {
      if (!data.length) dispatch(getIngredients());
    },
    [data.length, dispatch]
  );

  const [isModalActive, setModalActive] = useState(false);

  useEffect(
    () => {
      if (!isModalActive) {dispatch({ type: DELETE_INGREDIENT_DATA })}
    },
    [dispatch, isModalActive]
  );

  const handleCardClick = useCallback(
    (e) => {
      const parentNode = e.currentTarget;
      const id = parentNode.getAttribute('data-id');
      const ingredientData = [...data].filter(item => item._id === id)&&
        [...data].filter(item => item._id === id)[0];
      dispatch({
        type: ADD_INGREDIENT_DATA,
        ingredientData
      });
      setModalActive(true);
    }, [data, dispatch]
  );

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

  const setTab = (tab) => {
    setCurrent(tab);
    const element =
      tab === 'bun' ? refBun.current : tab === 'sauce' ? refSauce.current : refMain.current;
    if (element) element.scrollIntoView({ behavior: "smooth" });
  }

  const countOfIngredients = useMemo(
    ()=> {
      const counters = {};
      dataSelected.forEach((ingredient) => {
        if (!counters[ingredient._id]) counters[ingredient._id] = 0;
        counters[ingredient._id]++;
        if (ingredient.type === 'bun') counters[ingredient._id] = 2;
      });
    return counters;
    },
    [dataSelected]
  );
  
  const content = useMemo(
    () => {
      return dataRequest ? (
        <Preloader />
      ) : (
        dataFailed ? (
          <div className="text text_type_main-large">Произошла ошибка. Перезагрузите браузер.</div>
        ) : (
          <>
            <h2 className='text text_type_main-large pb-5'>Соберите бургер</h2>
            <Tabs current={current} setTab={setTab}/>
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
                    countOfIngredients={countOfIngredients}
                  />
              )}
            </ListOfBlocks>
          </>
        )
      )
    },
    [data, dataRequest, dataFailed, current, countOfIngredients, handleCardClick]
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