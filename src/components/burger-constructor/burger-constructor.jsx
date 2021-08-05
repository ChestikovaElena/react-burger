import {useState, useContext, useEffect, useReducer, useMemo} from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal';
import OrderDetails from '../order-details';
import TotalPrice from '../total-price';
import styles from './burger-constructor.module.css';
import {DataContext} from '../../services/app-context';
import { IngredientCard } from './ingredient-card';
import { IngredientsList } from './ingredient-list';

const Container = (props) => {
  return (
    <ul className={`${styles.container} `}>
      {props.children}
    </ul>
  );
}

const BurgerConstructor = () => {
  const API_SOURCE = 'https://norma.nomoreparties.space/api/orders';
  const INDEXOFCHOSENBUN = 0;
  const arrayOfID = [];

  const { dataState } = useContext(DataContext);
  const { data } = dataState;

  const [isModalActive, setModalActive] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    isLoading: false,
    hasError: false,
    orderNumber: '',
  });

  const handleButtonClick = (e) => {
    getOrderInfo();
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
    const totalPrice = data.reduce(
      (sum, item, index) =>
        (index !== INDEXOFCHOSENBUN && item.type !== 'bun')
          ?
            (sum + item.price)
          :
            (index === INDEXOFCHOSENBUN) ? (sum + item.price*2) : 0
        , 0
    );
    totalPriceDispatch({ type: 'set', payload: totalPrice });
    }, [data]
  );

  const content = useMemo(
    () => data.map((item,index) =>
      index !== INDEXOFCHOSENBUN && item.type !== 'bun' &&
      <IngredientCard
        key={`${item.index}`}
        type={null}
        name={item.name}
        isLocked={false}
        price={item.price}
        image={item.image}
        isDraged={true}
      />
    ), [data]
  );

  const getOrderInfo = () => {
    setOrderInfo({...orderInfo, hasError: false, isLoading: true});
    data.map((item,index) =>
      {
        if (index === INDEXOFCHOSENBUN || item.type !== 'bun') 
          arrayOfID.push(item._id);
      }
    );

    fetch(API_SOURCE, {
      method: 'POST',
      body: JSON.stringify({"ingredients": arrayOfID}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(result => {
                        if (result.ok) {
                          return result.json();
                        } return Promise.reject(`Ошибка ${result.status}`);
                      })
      .then(result => setOrderInfo({...orderInfo, orderNumber: result.order.number, isLoading: false}))
      .catch(error => setOrderInfo({...orderInfo, hasError: true, isLoading: false}));
  };

  return (
    <>
      <section className={`${styles.column} pt-25 pl-4`}>
        <Container>
          {data[INDEXOFCHOSENBUN] && <IngredientCard
            type={'top'}
            name={`${data[INDEXOFCHOSENBUN].name} (верх)`}
            isLocked={true}
            price={data[INDEXOFCHOSENBUN].price}
            image={data[INDEXOFCHOSENBUN].image}
            isDraged={false}
          />}
          <li>
            <IngredientsList
              children = {content}
            />
          </li>
          {data[INDEXOFCHOSENBUN] && <IngredientCard
            type={'bottom'}
            name={`${data[INDEXOFCHOSENBUN].name} (низ)`}
            isLocked={true}
            price={data[INDEXOFCHOSENBUN].price}
            image={data[INDEXOFCHOSENBUN].image}
            isDraged={false}
          />}
        </Container>
        <div className={ `${styles.row_order} mt-10 mr-4` }>
          <TotalPrice totalPrice={totalPriceState.totalPrice}/>
          <Button type="primary" size="medium" onClick={handleButtonClick}>
            Оформить заказ
          </Button>
        </div>
      </section>
      {isModalActive && 
        <Modal setModalActive={setModalActive} title=''>
          <OrderDetails orderInfo={orderInfo}/>
        </Modal>
      }
    </>
  );
}

export default BurgerConstructor