import Column from "../column";
import { ColumnOfOrders } from './column-of-orders';
import { TotalOrders } from './total-orders';
import styles from './summury-of-orders.module.css';

export const SummuryOfOrders = () => {
  const arrayDone = ['034533', '0455322', '034530', '034527', '034525','034533', '0455322', '034530', '034527', '034525',
  '034533', '0455322', '034530', '034527', '034525','034533', '0455322', '034530', '034527', '034525',];
  
  return (
    <Column>
      <div className={`mb-15 ${styles.summury_status}`}>
        <ColumnOfOrders type="done" orders={arrayDone} />
        <ColumnOfOrders orders={arrayDone} />
      </div>
      <TotalOrders
        title="Выполнено за все время:"
        total="28752"
        style="mb-15"
      />
      <TotalOrders
        title="Выполнено за сегодня:"
        total="138"
      />
    </Column>
  )
}