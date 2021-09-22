import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ListOfOrders from "../components/list-of-orders";
import SummuryOfOrders from "../components/summury-of-orders";
import { processOrders } from '../utils/process-orders.ts';
import { 
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED
} from '../services/actions/ws.ts';

export const FeedPage = () => {
  const dispatch = useDispatch();
  const { data, orders } = useSelector((store) => ({
    data: store.data.data,
    orders: store.ws.orders
  }));

  useEffect(
    () => {
      dispatch({
        type: WS_CONNECTION_START
      });

      return () => {
        dispatch({
          type: WS_CONNECTION_CLOSED
        });
      }
    },
    []
  );

  useEffect(
    () => {
      let ordersNoUpdating;
      if (orders && orders.length) {
        ordersNoUpdating = orders.filter(item => !item.isUpdateOrder);
      }
      if (ordersNoUpdating && ordersNoUpdating.length !== 0) {
        processOrders(data, dispatch, ordersNoUpdating, 'ws')
      };
    },
    [orders]
  );

  return (
    <>
      <ListOfOrders />
      <SummuryOfOrders />
    </>
  );
}

export default FeedPage;