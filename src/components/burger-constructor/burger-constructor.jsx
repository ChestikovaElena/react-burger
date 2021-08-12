import { useState, useEffect, useReducer, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal';
import OrderDetails from '../order-details';
import TotalPrice from '../total-price';
import styles from './burger-constructor.module.css';
import { IngredientCard } from './ingredient-card';
import { IngredientsList } from './ingredient-list';
import { getOrderInformation } from '../../services/actions';
import {
  ADD_SELECTED_INGREDIENT,
  INCREASE_COUNT_BUN,
  INCREASE_COUNT_FILLER,
  REORDER_SELECTED_INGREDIENTS,
  CLEAR_DATA
} from '../../services/actions';

const Container = (props) => {
  return (
    <ul className={`${styles.container} `}>
      {props.children}
    </ul>
  );
}

const BurgerConstructor = () => {
  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop({ id, type }) {
      dispatch({
        type: ADD_SELECTED_INGREDIENT,
        id
      });
      if (type === 'bun') {
        dispatch({
          type: INCREASE_COUNT_BUN,
          id
        })
      } else {
        dispatch({
          type: INCREASE_COUNT_FILLER,
          id
        })
      }
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const { dataSelected } = useSelector((state) => ({
    dataSelected: state.dataSelected,
  }));
  const dispatch = useDispatch();

  const [isModalActive, setModalActive] = useState(false);
   
  const handleButtonClick = (e) => {
    if (dataSelected.filter(item => item.type === 'bun').length!==0) {
      let arrayOfID = [];
      dataSelected.map(item => arrayOfID.push(item._id));
      
      dispatch(getOrderInformation(arrayOfID));
      setModalActive(true);
      dispatch({
        type: CLEAR_DATA
      })
    } else {
      alert('Выберите булку');
    }
    
  }

  const totalPriceInitialState = { totalPrice: 0 };

  function reducer(state, action) {
    switch (action.type) {
      case 'set':
        return { totalPrice: action.payload };
      case 'reset':
        return totalPriceInitialState;
      default:
        return state;
    }
  }

  const [totalPriceState, totalPriceDispatch] = useReducer(reducer, totalPriceInitialState, undefined);

  useEffect(() => {
    const totalPrice = dataSelected.reduce(
      (sum, item, index) =>
        (item.type !== 'bun')
          ?
            (sum + item.price)
          :
            (sum + item.price*2)
        , 0
    );
    totalPriceDispatch({ type: 'set', payload: totalPrice });
    }, [dataSelected]
  );

  const bun = useMemo(
    () => {
      return dataSelected.filter(item => item.type === 'bun')
    },
    [dataSelected]
  );
  
  const filler = useMemo(
    () => {
      return dataSelected.filter(item => item.type !== 'bun')
    },
    [dataSelected]
  );

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const newSelectedData = [...dataSelected];
      newSelectedData.splice(hoverIndex, 0, newSelectedData.splice(dragIndex, 1)[0]);
      dispatch({
        type: REORDER_SELECTED_INGREDIENTS,
        payload: newSelectedData
      })
    }, [dataSelected]
  )

  return (
    <>
      <section className={`${styles.column} ${isHover ? styles.column_isHover : ''} pt-25 pl-4`} ref={dropTarget}>
        {dataSelected.length===0 ? (
          <p className='text text_type_main-large mt-15'>Перетащите сюда ингредиенты для бургера</p>
        ) : (
          <>
            <Container>
              {bun.length!==0 && 
                <li className={`mt-4 pl-8 ${styles.block}`}>
                  <ConstructorElement 
                    type={'top'}
                    isLocked={true}
                    text={`${bun[0].name} (верх)`}
                    price={bun[0].price}
                    thumbnail={bun[0].image}
                    id={bun[0]._id}
                  />
                </li>
              }
              <li>
                {filler.length!==0 && <IngredientsList>
                  {dataSelected.map((item,index) => 
                    item.type !== 'bun' &&
                      <IngredientCard
                        key={`${index}`}
                        index={index}
                        type={null}
                        name={item.name}
                        isLocked={false}
                        price={item.price}
                        image={item.image}
                        id={item._id}
                        customID={item.customID}
                        isDraged={true}
                        moveCard={moveCard}
                      />
                  )}
                </IngredientsList>}
              </li>
              {bun.length!==0 && 
                <li className={`mt-4 pl-8 ${styles.block}`}>
                  <ConstructorElement 
                    type={'bottom'}
                    isLocked={true}
                    text={`${bun[0].name} (низ)`}
                    price={bun[0].price}
                    thumbnail={bun[0].image}
                    id={bun[0]._id}
                  />
                </li>
              }
            </Container>
            <div className={ `${styles.row_order} mt-10 mr-4` }>
              <TotalPrice totalPrice={totalPriceState.totalPrice}/>
              <Button type="primary" size="medium" onClick={handleButtonClick}>
                Оформить заказ
              </Button>
            </div>
          </>
        )}
      </section>
      
      {isModalActive && 
        <Modal setModalActive={setModalActive} title=''>
          <OrderDetails />
        </Modal>
      }
    </>
  );
}

export default BurgerConstructor