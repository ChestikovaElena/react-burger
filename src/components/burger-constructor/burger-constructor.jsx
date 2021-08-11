import { useState, useEffect, useReducer, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal';
import OrderDetails from '../order-details';
import TotalPrice from '../total-price';
import styles from './burger-constructor.module.css';
import { IngredientCard } from './ingredient-card';
import { IngredientsList } from './ingredient-list';
import { getOrderInformation } from '../../services/actions';

const Container = (props) => {
  return (
    <ul className={`${styles.container} `}>
      {props.children}
    </ul>
  );
}

const BurgerConstructor = () => {
  const { dataSelected } = useSelector((state) => ({
    dataSelected: state.dataSelected,
  }));
  const dispatch = useDispatch();

  const [isModalActive, setModalActive] = useState(false);
  
  const handleButtonClick = (e) => {
    let arrayOfID = [];
    dataSelected.map(item => arrayOfID.push(item._id));
    
    dispatch(getOrderInformation(arrayOfID));
    setModalActive(true);
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

  return (
    <>
      {dataSelected.length===0 ? (
        <p className='text text_type_main-large mt-15'>Выберите ингредиенты для бургера</p>
      ) : (
        <section className={`${styles.column} pt-25 pl-4`}>
          <>
            <Container>
              {bun.length!==0 && <IngredientCard
                type={'top'}
                name={`${bun[0].name} (верх)`}
                isLocked={true}
                price={bun[0].price}
                image={bun[0].image}
                isDraged={false}
              />}
              <li>
                {filler.length!==0 && <IngredientsList>
                  {dataSelected.map((item,index) => 
                    item.type !== 'bun' &&
                    <IngredientCard
                      key={`${index}`}
                      type={null}
                      name={item.name}
                      isLocked={false}
                      price={item.price}
                      image={item.image}
                      isDraged={true}
                    />
                  )}
                </IngredientsList>}
              </li>
              {bun.length!==0 && <IngredientCard
                type={'bottom'}
                name={`${bun[0].name} (низ)`}
                isLocked={true}
                price={bun[0].price}
                image={bun[0].image}
                isDraged={false}
              />}
            </Container>
            <div className={ `${styles.row_order} mt-10 mr-4` }>
              <TotalPrice totalPrice={totalPriceState.totalPrice}/>
              <Button type="primary" size="medium" onClick={handleButtonClick}>
                Оформить заказ
              </Button>
            </div>
          </>
        </section>
      )}
      {isModalActive && 
        <Modal setModalActive={setModalActive} title=''>
          <OrderDetails />
        </Modal>
      }
    </>
  );
}

export default BurgerConstructor