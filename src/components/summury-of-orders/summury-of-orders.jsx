import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import Column from "../column";
import { ColumnOfOrders } from './column-of-orders';
import { TotalOrders } from './total-orders';
import styles from './summury-of-orders.module.css';

const Summury = () => {
  const { orders, total, totalToday } = useSelector((store) => ({
    orders: store.ws.orders,
    total: store.ws.total,
    totalToday: store.ws.totalToday,
  }))
  
  const ordersDone = useMemo(
    () => {
      return orders.filter(item => item.status === 'done').filter((item, index) => index <= 9)
    },
    [orders]
  );

  const ordersOther = useMemo(
    () => {
      return orders.filter(item => item.status !== 'done').filter((item, index) => index <= 9)
    },
    [orders]
  );

  return (
    <>
      <div className={`mb-15 ${styles.summury_status}`}>
        <ColumnOfOrders type="done" orders={ordersDone} />
        <ColumnOfOrders orders={ordersOther} />
      </div>
      {total && <TotalOrders
        title="Выполнено за все время:"
        total={total}
        style="mb-15"
      />}
      {totalToday && <TotalOrders
        title="Выполнено за сегодня:"
        total={totalToday}
      />}
    </>
  )
}

export const SummuryOfOrders = () => {
  return (
    <Column>
      <Summury />
    </Column>
  )
}