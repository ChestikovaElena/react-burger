import { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal';
import OrderDetails from '../order-details';
import TotalPrice from '../total-price';
import styles from './burger-constructor.module.css';
import { IngredientCard } from './ingredient-card';
import { IngredientsList } from './ingredient-list';
import { TitleMessage } from './title-message';
import { getOrderInformation } from '../../services/actions/order';
import {
  ADD_SELECTED_INGREDIENT,
  REORDER_SELECTED_INGREDIENTS,
  CLEAR_SELECTED_INGREDIENTS
} from '../../services/actions/data-selected';

const Container = (props) => {
  return (
    <ul className={`${styles.container} `}>
      {props.children}
    </ul>
  );
}

const BurgerConstructor = () => {
  const { data, dataSelected, isLoggedIn } = useSelector((state) => ({
    data: state.data.data,
    dataSelected: state.dataSelected.dataSelected,
    isLoggedIn: state.user.isLoggedIn
  }));
  const dispatch = useDispatch();
  
  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop({ id, type }) {
      const customID = uuidv4();
      const newDataSelected = type !== 'bun' ?
        [...dataSelected,
          {...data.filter(item => item._id === id)[0], customID: customID}
        ]
      :
        [...dataSelected.filter(item => item.type !== 'bun'),
          {...data.filter(item => item._id === id)[0], customID: customID}
        ];
      dispatch({
        type: ADD_SELECTED_INGREDIENT,
        newDataSelected
      });
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const [isModalActive, setModalActive] = useState(false);
  const [redirect, setRedirect] = useState(false);
   
  const handleButtonClick = (e) => {
    if (!isLoggedIn) {
      setRedirect(true);
    } else {
      if (dataSelected.filter(item => item.type === 'bun').length!==0) {
        let arrayOfID = [];
        dataSelected.map(item => arrayOfID.push(item._id));
        
        dispatch(getOrderInformation(arrayOfID));
        setModalActive(true);
        dispatch({
          type: CLEAR_SELECTED_INGREDIENTS
        })
      } else {
        alert('Выберите булку');
      }
    }
  }

  const totalPrice = useMemo(
    ()=> {
      return dataSelected.reduce(
        (sum, item) =>
          (item.type !== 'bun')
            ?
              (sum + item.price)
            :
              (sum + item.price*2)
          , 0
      );
    },
    [dataSelected]
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
      dispatch({
        type: REORDER_SELECTED_INGREDIENTS,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
      })
    }, [dispatch]
  );

  if (redirect) {
    return (
      <Redirect to={{ pathname: '/login' }} />
    )
  }

  return (
    <>
      <section className={`${styles.column} ${isHover ? styles.column_isHover : ''} pt-25 pl-4`} ref={dropTarget}>
        {dataSelected.length===0 ? (
          <TitleMessage
            text='Переместите сюда ингредиенты для бургера'
            marginTop='15'
          />
        ) : (
          <>
            <Container>
              {bun.length!==0 ? 
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
                :
                <TitleMessage
                  text='Переместите сюда булку (верх)'
                  marginTop='15'
                />
              }
              <li>
                {filler && filler.length!==0 ?
                  <IngredientsList>
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
                  </IngredientsList>
                  :
                  <TitleMessage
                    text='Переместите сюда начинку'
                    marginTop='5'
                  />
                }
              </li>
              {bun && bun.length!==0 ? 
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
                :
                <TitleMessage
                  text='Переместите сюда булку (низ)'
                  marginTop='5'
                />
              }
            </Container>
            <div className={ `${styles.row_order} mt-10 mr-4` }>
              <TotalPrice totalPrice={totalPrice}/>
              {bun.length!==0 && <Button type="primary" size="medium" onClick={handleButtonClick}>
                Оформить заказ
              </Button>}
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