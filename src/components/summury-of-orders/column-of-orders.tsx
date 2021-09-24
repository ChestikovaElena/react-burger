import { FC } from 'react';
import { TOrder } from '../../services/types/data';
import styles from './summury-of-orders.module.css';

type TColumnOfOrdersProps = {
  orders: TOrder[],
  type: string
}

export const ColumnOfOrders: FC<TColumnOfOrdersProps> = ({ orders, type }) => {
  return (
    <div className={type === 'done' ? `${styles.column_wrapper} mr-9` : `${styles.column_wrapper}`}>
      <h3 className="mb-6 text text_type_main-medium">
        {type === 'done' ? `Готовы:` : `В работе:`}
      </h3>
      {orders.length ? (
        <div className={styles.orders}>
          <ul className={styles.orders_list}>
            {orders.map(
              (item, index) => 
                <li key={index} className="mb-2">
                  <span
                    className=
                      {type === 'done'
                        ? `text text_type_digits-default ${styles.item_done}`
                        : `text text_type_digits-default`}
                  >
                    {item.number}
                  </span>
                </li>
            )}
          </ul>
        </div>
        ) : (
          <div className='text text_type_main-default'>Заказов нет</div>
        )
      }
    </div>
  )
}