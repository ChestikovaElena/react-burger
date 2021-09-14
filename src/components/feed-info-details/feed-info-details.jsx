import { useEffect, useMemo, useState } from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import IngredientItem from '../ingredient-item';
import Preloader from '../preloader';
import TotalPrice from '../total-price';
import { getOrderInfoRequest } from '../../services/actions/order-info';
import { processOrders } from '../../utils/process-orders';
import styles from './feed-info-details.module.css';

export const FeedInfoDetails = ({ page }) => {
  const dispatch = useDispatch();
  const { data, ordersAll, ordersUser, order } = useSelector((state) => ({
    data: state.data.data,
    ordersAll: state.ws.orders,
    ordersUser: state.wsUser.orders,
    order: state.orderInfo.orderInfo
  }));

  const orders = (ordersAll && ordersAll.length)
    ? ordersAll
    : (ordersUser && ordersUser.length)
      ? ordersUser
      : null;
  console.log('orders', orders);
  const { orderNumber } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(false);

  const getOrderInfo = async () => {
    return await [...orders].filter(item => item.number == orderNumber);
  }

  useEffect(
    async () => {
      let soughtOrder;
      let orderDataValue = null;
      let errorValue = false;
      if (orders) {
        // есть orders - открыто модальоне окно и данные есть
        soughtOrder = await getOrderInfo();
        if (soughtOrder) {
          if (soughtOrder[0].isUpdateOrder) {
            orderDataValue = soughtOrder[0];
          } else {
            console.log('данные нужно обработать');
          }
        } else {
          errorValue = true;
        }
        console.log('orderDataValue', orderDataValue);
      } else { // нет orders - открыта отдельная страница, данные нужно получать
        console.log('2 line');
        dispatch(getOrderInfoRequest(orderNumber));
      }
      setOrderData(orderDataValue);
      setError(errorValue);
    },
    []
  );

  useEffect(
    async () => {
      let orderDataValue = null;
      let errorValue = false;
      if (order && order.length && data && data.length) {
        await processOrders(data, dispatch, order, 'orderInfo');
        if (order[0].isUpdateOrder) {
          orderDataValue = order[0]
        } else {
          console.log('данные нужно обработать');
        }
      }
      setOrderData(orderDataValue);
    },
    [data, order]
  )

  // useEffect(
  //   () => {
  //     if (data.length && orders.length) {
  //       processOrders(data, dispatch, orders, page !== 'profile' ? false : true);
  //     }
  //   },
  //   [data, orders]
  // )

  // const orderData = useMemo(
  //   () => {
  //     if (orders && orders.length) {
  //       return orders.filter(item => item.isUpdateOrder === true) && orders.filter(item => item.isUpdateOrder === true)[0]
  //     }
  //   },
  //   [orders]
  // )
  
  // useEffect(
  //   async () => {
  //     let soughtOrder = null;
  //     let orderDataValue = null;
  //     let errorValue = false;
      
  //     if (orders.length == 0) {
  //       dispatch(getOrderInfoRequest(orderId));
  //       processOrders(data, dispatch, orders, page !== 'profile' ? false : true);
  //     } else {
  //       if (orders.length === 1) {
  //         orderDataValue = orders[0];
  //       } else if (orders.length !== 0) {
  //         soughtOrder = await getOrderInfo();
  //         if (soughtOrder && soughtOrder.length) {
  //           orderDataValue = soughtOrder[0];
  //         } else {errorValue = true};
  //       }
  //     }
      
  //     setOrderData(orderDataValue);
  //     setError(errorValue);
  //   }, []
  // );

  // useEffect(
  //   async () => {
  //     let soughtOrder = null;
  //     let orderDataValue = null;
  //     let errorValue = false;

  //     if (orders.length !== 0) {
  //       soughtOrder = await getOrderInfo();

  //       if (soughtOrder && soughtOrder.length) {
  //         orderDataValue = soughtOrder[0];
  //       } else {errorValue = true};
  //     }

  //     setOrderData(orderDataValue);
  //     setError(errorValue);
  //   },
  //   [orderId, orders, wsConnected]
  // );

  // const updateOrders = useMemo(
  //   () => {
  //     if (orders && orders.length) {
  //       return orders.filter(item => item.isUpdateOrder === true)
  //     }
  //   },
  //   [orders]
  // );

  // useEffect(
  //   async () => {
      
  //     let soughtOrder = null;
  //     let orderDataValue = null;
  //     let errorValue = false;

  //     if (orders.length) {
  //       soughtOrder = await getOrderInfo();

  //       if (soughtOrder && soughtOrder.length) {
  //         orderDataValue = soughtOrder[0];
  //       } else {errorValue = true};
  //     }
  //     setOrderData(orderDataValue);
  //     setError(errorValue);
  //   },
  //   [orderId, orders, wsConnected]
  // );

  // useEffect(
  //   () => {
  //     if (orders && orders.length !== 0 && !orderData && data.length !== 0) {
  //       processOrders(data, dispatch, orders, page !== 'profile' ? false : true);
        
  //       let orderDataValue = null;
  //       let errorValue = false;
  //       if (orders && orders.length !== 0) {
  //         orderDataValue = orders[0];
  //         errorValue = false; 
  //       } else {
  //         errorValue = true;
  //       }
  //       setOrderData(orderDataValue);
  //       setError(errorValue);
  //     };
  //   },
  //   [data, orders]
  // )
    console.log('orderData', orderData);
  const totalPrice = useMemo(
    ()=> {
      if (orderData && orderData.ingredients && orderData.ingredients.length) {
        return orderData.ingredients.reduce(
            (sum, item) => (sum + item.price * item.count), 0
          );
      }
    },
    [orderData]
  );

  return (
    <>
      {error ? (
          <p className='text text_type_main-medium text_color_inactive mt-8'>Заказ с таким ID не найден</p>
        ) : (
          !orderData ? (
            <Preloader />
          ) : (
            <div className={ styles.content}>
              <h3 className={`mb-10 text text_type_digits-default ${styles.title}`}>
                {`#${orderData.number}`}
              </h3>
              <h4 className={`mb-3 text text_type_main-medium ${styles.name}`}>
                {orderData.name}
              </h4>
              <p className={`mb-15 text text_type_main-default ${styles.status}`}>
                {orderData === 'done' ? "Выполнен" : "В работе"}
              </p>
              <h4 className="mb-6 text text_type_main-medium">Состав:</h4>
              <div className={`mb-10`}>
                <ul className={`pr-4 ${styles.ingredients_list}`}>
                  {orderData.ingredients
                    .map(
                      (item, index) =>
                        <IngredientItem
                          key={`${index}`}
                          item={item}
                          index={index}
                        />
                    )
                  }
                </ul>
              </div>
              <div className={styles.row}>
                <span className="text text_type_main-default text_color_inactive">
                  {orderData.createdAt}
                </span>
                {totalPrice && <TotalPrice totalPrice={totalPrice} type="def"/>}
              </div>
          </div>
          )
        )
      }
    </>
  )
}