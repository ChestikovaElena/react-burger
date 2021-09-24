import { FC, useMemo } from 'react';
import { useSelector } from '../../services/hooks';
import { useLocation } from 'react-router-dom';

import Column from '../column';
import OrderCard from '../order-card';
import Preloader from '../preloader';
import { TOrder } from '../../services/types/data';

type TOrderProps = {
  page: string
}

const Orders: FC<TOrderProps> = ({ page }) => {
  const { ordersAll, ordersUser } = useSelector((state) => ({
    ordersAll: state.ws.orders,
    ordersUser: state.wsUser.orders,
  }));

  const path = useLocation();

  const orders = (!path.pathname.includes('profile'))
    ? ordersAll
    : (ordersUser && ordersUser.length)
      ? ordersUser
      : null;

  const updateOrders = useMemo(
    () => {
      if (orders && orders.length) {
        return orders.filter((item: TOrder) => item.isUpdateOrder === true)
      }
    },
    [orders]
  );
  
  return (
    <>
      {(updateOrders && updateOrders.length) ? (
        updateOrders.map(
          (item: TOrder, index: number) => 
            <li key={`${item._id}${index}`} className="mb-4">
              <OrderCard orderInfo={item} page={page}/>
            </li>
        )
      ) : (
        orders && orders.length ? (
          <Preloader />
        ) : (
          <p className="mt-20 text text_type_main-medium">
            У пользователя нет заказов
          </p>
        )
      )}
    </>
  )
}

type TListOfOrdersProps = {
  page: string
}

export const ListOfOrders: FC<TListOfOrdersProps> = ({ page }) => {

  return (
    <Column
      request={false}
      requestFailed={false}
      title= {!page ? "Лента заказов" : null}
      type={!page ? "right" : "none"}
    >
      <Orders page={page}/>
    </Column>
  );
}
