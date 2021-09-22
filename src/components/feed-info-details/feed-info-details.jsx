import { useEffect, useMemo, useState } from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';

import IngredientItem from '../ingredient-item';
import Preloader from '../preloader';
import TotalPrice from '../total-price';
import { getOrderInfoRequest } from '../../services/actions/order-info.ts';
import { processOrders } from '../../utils/process-orders.ts';
import styles from './feed-info-details.module.css';

export const FeedInfoDetails = () => {
  const dispatch = useDispatch();
  const { data, ordersAll, ordersUser, order } = useSelector((state) => ({
    data: state.data.data,
    ordersAll: state.ws.orders,
    ordersUser: state.wsUser.orders,
    order: state.orderInfo.orderInfo
  }));
  const path = useLocation();

  const orders = (!path.pathname.includes('profile'))
    ? ordersAll
    : (ordersUser && ordersUser.length)
      ? ordersUser
      : null;
  
  const { orderNumber } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(false);

  const getOrderInfo = async () => {
    return await [...orders].filter(item => String(item.number) === orderNumber);
  }

  useEffect(
    async () => {
      let soughtOrder;
      let orderDataValue = null;
      let errorValue = false;
      if (orders && orders.length) {
        // есть orders - открыто модальоне окно и данные есть
        soughtOrder = await getOrderInfo();
        if (soughtOrder && soughtOrder.length) {
          if (soughtOrder[0].isUpdateOrder) {
            orderDataValue = soughtOrder[0];
          } else {
            console.log('данные нужно обработать');
          }
        } else {
          errorValue = true;
        }
        
      } else { // нет orders - открыта отдельная страница, данные нужно получить с сервера
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

  const totalPrice = useMemo(
    ()=> {
      if (orderData && orderData.ingredients && orderData.ingredients.length) {
        const newIngredients = orderData.ingredients.filter(item => !!item);
        return newIngredients.reduce(
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
              <p className={`mb-15 text text_type_main-default 
                ${orderData.status !== 'done' ? styles.status_green : styles.status}`}>
                {orderData.status === 'done' ? "Готов" : "В работе"}
              </p>
              <h4 className={`mb-6 text text_type_main-medium ${styles.name}`}>Состав:</h4>
              <div className={`mb-10`}>
                <ul className={`pr-4 ${styles.ingredients_list}`}>
                  {orderData.ingredients.length && orderData.ingredients.filter(item => !!item)
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