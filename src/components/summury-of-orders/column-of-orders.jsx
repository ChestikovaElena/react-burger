import styles from './summury-of-orders.module.css';

export const ColumnOfOrders = ({ orders, type }) => {
  return (
    <div className={type === 'done' ? `${styles.column_wrapper} mr-9` : `${styles.column_wrapper}`}>
      <h3 className="mb-6 text text_type_main-medium">
        {type === 'done' ? `Готовы:` : `В работе:`}
      </h3>
      <div className={styles.orders}>
        <ul className={styles.orders_list}>
          {orders.filter((item, index) => index <= 9)
            .map(
              (item, index) => 
                <li key={index} className="mb-2">
                  <span
                    className=
                      {type === 'done'
                        ? `text text_type_digits-default ${styles.item_done}`
                        : `text text_type_digits-default`}
                  >
                    {item}
                  </span>
                </li>
          )}
        </ul>
      </div>
    </div>
  )
}