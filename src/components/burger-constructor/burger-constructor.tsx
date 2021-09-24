import { FC, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import { useDrop } from 'react-dnd';
import { Link, Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
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

type TContainerProps = React.ReactNode;

const Container: FC<TContainerProps> = (props) => {
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
    drop(curItem: { id: string, type: string }) {
      const customID = uuidv4();
      const newDataSelected = curItem.type !== 'bun' ?
        [...dataSelected,
          {...data.filter(item => item._id === curItem.id)[0], customID: customID}
        ]
      :
        [...dataSelected.filter(item => item.type !== 'bun'),
          {...data.filter(item => item._id === curItem.id)[0], customID: customID}
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

  const [redirect, setRedirect] = useState(false);

  const handleButtonClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      setRedirect(true);
    } else {
      if (dataSelected.filter(item => item.type === 'bun').length!==0) {
        let arrayOfID: Array<string> = [];
        dataSelected.map(item => {
          if (item.type === 'bun') {
            arrayOfID.push(item._id);
            arrayOfID.push(item._id)
          } else {
            arrayOfID.push(item._id)
          }
        });
        
        dispatch(getOrderInformation(arrayOfID));

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
                    // id={bun[0]._id}
                    // handleClose={() => removeIngredientHandler(bun[0]._id)}
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
                          type={undefined}
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
                    // id={bun[0]._id}
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
              <TotalPrice totalPrice={totalPrice} type='large'/>
              { isLoggedIn ? (
                  bun.length!==0 &&
                    <Link 
                      to={{
                        pathname: `/order`
                      }}
                      onClick={handleButtonClick}
                      className={ `${styles.button} pt-5 pr-10 pb-5 pl-10 text text_type_main-default`}
                    >
                      Оформить заказ
                    </Link>
                  ) : (
                    <Link 
                      to={{
                        pathname: `/login`
                      }}
                      className={ `${styles.button} pt-5 pr-10 pb-5 pl-10 text text_type_main-default`}
                    >
                      Войти
                    </Link>
                  )
              }
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default BurgerConstructor