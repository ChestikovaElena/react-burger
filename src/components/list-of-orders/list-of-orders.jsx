import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import Column from '../column';
import OrderCard from '../order-card';
import Preloader from '../preloader';

const Orders = () => {
  const { orders } = useSelector((store) => ({
    orders: store.ws.orders
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
      <Preloader />
    )
  )
}

export const ListOfOrders = () => {

  return (
    <Column request={false} requestFailed={false} title="Лента заказов" type="right">
      <Orders />
    </Column>
  );
}

export default ListOfOrders;