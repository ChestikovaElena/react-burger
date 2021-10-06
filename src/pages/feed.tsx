import { useEffect } from "react";
import { useDispatch, useSelector } from "../services/hooks";

import ListOfOrders from "../components/list-of-orders";
import SummuryOfOrders from "../components/summury-of-orders";
import { processOrders } from "../utils/process-orders";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
  WS_UPDATE_ORDER,
} from "../services/actions/ws";

export const FeedPage = () => {
  const dispatch = useDispatch();
  const { data, orders } = useSelector((store) => ({
    data: store.data.data,
    orders: store.ws.orders,
  }));

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
    });

    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSED,
      });
    };
  }, []);

  useEffect(() => {
    async function getOrder() {
      let ordersNoUpdating;
      if (orders && orders.length) {
        ordersNoUpdating = orders.filter((item) => !item.isUpdateOrder);
      }
      if (ordersNoUpdating && ordersNoUpdating.length !== 0) {
        const updateOrder = await processOrders(data, ordersNoUpdating, "ws");
        //const updateOrder = await processOrders(data, order, 'orderInfo');
        if (updateOrder && updateOrder.ingredients) {
          dispatch({
            type: WS_UPDATE_ORDER,
            updateOrder,
          });
        }
        // } else if ( updateOrder && newIngredients.length && updatingState === 'wsUser' ) {
        //   dispatch({
        //     type: WS_USER_UPDATE_ORDER,
        //     updateOrder
        //   })
      }
    }
    getOrder();
  }, [orders]);

  return (
    <>
      <ListOfOrders page="feed" />
      <SummuryOfOrders />
    </>
  );
};

export default FeedPage;
