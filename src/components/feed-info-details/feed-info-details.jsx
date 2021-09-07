import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import IngredientItem from '../ingredient-item';
import Preloader from '../preloader';
import styles from './feed-info-details.module.css';

export const FeedInfoDetails = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(false);
  let date = new Date();
  date = date.toUTCString();

  const data = [
    {
      id: '2434325464564',
      number: '03898455',
      time: date,
      title: 'Death Star Starship бургер',
      ingredients: [
        '60d3b41abdacab0026a733c6',
        '60d3b41abdacab0026a733cd',
        '60d3b41abdacab0026a733cd',
        '60d3b41abdacab0026a733ce',
        '60d3b41abdacab0026a733c9',
        '60d3b41abdacab0026a733cb',
        '60d3b41abdacab0026a733ca'
      ],
      cost: 1800
    },
    {
      id: '78566364646',
      number: '03898455',
      time: date,
      title: 'Death Star Starship бургер',
      ingredients: [
        '60d3b41abdacab0026a733c9',
        '60d3b41abdacab0026a733cb',
        '60d3b41abdacab0026a733ca'
      ],
      cost: 1800
    }
  ];

  const getOrderInfo = () => {
    return [...data].filter(item => item.id === orderId);
  }

  useEffect(
    () => {
      let soughtOrder = null;
      let orderDataValue = null;
      let errorValue = false;

      if (data.length) {
        soughtOrder = getOrderInfo();

        if (soughtOrder && soughtOrder.length) {
          orderDataValue = soughtOrder[0];
        } else {errorValue = true};
      }
      
      setOrderData(orderDataValue);
      setError(errorValue);
    },
    [orderId]
  );

  return (
    <div>
      {error ? (
          <p className='text text_type_main-medium text_color_inactive mt-8'>Заказ с таким ID не найден</p>
        ) : (
          orderData === null ? (
            <Preloader />
          ) : (
          <>
            <h3 className="mb-10 text text_type_digits-medium">
              {orderData.id}
            </h3>
            <h4 className="mb-3 text text_type_main-medium">
              {orderData.title}
            </h4>
            <p className={`mb-15 text text_type_main-default ${styles.status}`}>
              Выполнен
            </p>
            <h4 className="mb-6 text text_type_main-medium">Состав:</h4>
            <div className={`mb-10 ${styles.ingredients_list}`}>
              <ul>
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
          </>
          )
        )
      }
    </div>
  )
}