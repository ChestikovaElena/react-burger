import { useEffect, useMemo, useState } from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import IngredientItem from '../ingredient-item';
import Preloader from '../preloader';
import TotalPrice from '../total-price';
import { getOrderInfoRequest } from '../../services/actions/ws';
import styles from './feed-info-details.module.css';

export const FeedInfoDetails = ({ page }) => {
  const dispatch = useDispatch();
  const { orders, wsConnected } = useSelector((state) => ({
    orders: !page ? state.ws.orders : state.wsUser.orders,
    wsConnected: state.wsUser.wsConnected,
  }));

  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(false);

  const getOrderInfo = async () => {
    return await [...orders].filter(item => item._id === orderId);
  }

  useEffect(
    async () => {
      let soughtOrder = null;
      let orderDataValue = null;
      let errorValue = false;

      if (orders.length) {
        soughtOrder = await getOrderInfo();

        if (soughtOrder && soughtOrder.length) {
          orderDataValue = soughtOrder[0];
        } else {errorValue = true};
      }

      if (!wsConnected && !orders.length) {
        dispatch(getOrderInfoRequest(orderId));

        // if (soughtOrder && soughtOrder.length) {
        //   orderDataValue = soughtOrder[0];
        // } else {errorValue = true};
      }

      setOrderData(orderDataValue);
      setError(errorValue);
    },
    [orderId, orders, wsConnected]
  );

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
          orderData === null ? (
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