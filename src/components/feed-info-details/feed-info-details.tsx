import { useEffect, useMemo, useState } from 'react';
import { useDispatch ,useSelector } from '../../services/hooks';
import { useParams, useLocation } from 'react-router-dom';

import { UPDATE_ORDER_INFO } from '../../services/actions/order-info';
import IngredientItem from '../ingredient-item';
import Preloader from '../preloader';
import TotalPrice from '../total-price';
import { getOrderInfoRequest } from '../../services/actions/order-info';
import { processOrders } from '../../utils/process-orders';
import styles from './feed-info-details.module.css';
import { TIngredientInUpdateOrder, TOrder } from '../../services/types/data';

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
  
  const { orderNumber } = useParams<{orderNumber: string}>();
  const [orderData, setOrderData] = useState<TOrder | null>(null);
  const [error, setError] = useState<boolean>(false);

  const getOrderInfo = async () => {
    return await [...orders as TOrder[]].filter(item => String(item.number) === orderNumber);
  }

  useEffect(() => {
      async function getOrder() {
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
      };
      getOrder();
    },
    []
  );

  useEffect(() => {
      async function getOrder() {
        let orderDataValue: TOrder | null = null;
        let errorValue: boolean = false;
        if (order && order.length && data && data.length) {
          const updateOrder = await processOrders(data, order, 'orderInfo');
          if ( updateOrder && updateOrder.ingredients ) {
            dispatch({
              type: UPDATE_ORDER_INFO,
              updateOrder
            })
          }
          if (order[0].isUpdateOrder) {
            orderDataValue = order[0]
          } else {
            console.log('данные нужно обработать');
          }
        }
        setOrderData(orderDataValue);
      };
      getOrder();
    },
    [data, order]
  )

  const totalPrice = useMemo(
    ()=> {
      if (orderData && orderData.ingredients && orderData.ingredients.length) {
        const ingredientsFromOrderStore = orderData.ingredients as TIngredientInUpdateOrder[];
        const newIngredients: Array<TIngredientInUpdateOrder> =
          ingredientsFromOrderStore.filter((item: TIngredientInUpdateOrder) => !!item);

        const acc: number = 0;
        return newIngredients.reduce(
            (sum: number, item: TIngredientInUpdateOrder) =>
              (sum + item.price * item.count),
            acc
          );
      }
    },
    [orderData]
  );

  const ingredientsContent = useMemo(
    () => {
      const orderDataCur = orderData as TOrder;
      if (orderDataCur && orderDataCur.ingredients.length) {
        const ingredientsFromOrder = orderDataCur.ingredients as TIngredientInUpdateOrder[];
        return (
          ingredientsFromOrder.length &&
            ingredientsFromOrder.filter((item: TIngredientInUpdateOrder) => !!item)
              .map(
                (item: TIngredientInUpdateOrder, index: number) =>
                  <IngredientItem
                    key={`${index}`}
                    item={item}
                    index={index}
                  />
          )
        )
      }
    },
    [orderData as TOrder]
  )

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
                  { ingredientsContent }
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