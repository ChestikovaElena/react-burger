import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import Column from '../column';
import OrderCard from '../order-card';
import Preloader from '../preloader';

const Orders = ({ page }) => {
  const { orders, wsConnected } = useSelector((store) => ({
    orders: page ? store.wsUser.orders: store.ws.orders,
    wsConnected: store.wsUser.wsConnected
  }));

  const updateOrders = useMemo(
    () => {
      return orders.filter(item => item.isUpdateOrder === true)
    },
    [orders]
  );
  
  return (
    updateOrders.length ? (
      updateOrders.map(
        (item, index) => 
          <li key={`${item._id}${index}`} className="mb-4">
            <OrderCard orderInfo={item}/>
          </li>
      )
    ) : (
      orders.length ? (
        <Preloader />
      ) : (
        <p className="mt-20 text text_type_main-medium">
          У пользователя нет заказов
        </p>
      )
    )
  )
}

export const ListOfOrders = ({ page }) => {

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

export default ListOfOrders;