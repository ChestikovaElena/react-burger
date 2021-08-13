import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderDetails = () => {
  const { order, orderRequest, orderFailed } = useSelector(state => ({
    order: state.order.order,
    orderRequest: state.order.orderRequest,
    orderFailed: state.order.orderFailed,
  }));

  const content = useMemo(
    () => {
      return orderRequest ? (
        <>
          <p className="text text_type_digits-large mb-8">...</p>
          <p className="text text_type_main-medium mb-15">получаем идентификатор заказа</p>
        </>
        ) : (
        orderFailed ? (
          <p className="text text_type_main-medium">Произошла ошибка. Обратитесь в техподдержку.</p>
        ) : (
          <>
            <p className="text text_type_digits-large mb-8">{order.number}</p>
            <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
            <div className={`mb-15 ${styles.icon_wrapper}`}>
              <CheckMarkIcon type="primery"/>
            </div>
            <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
          </>
        ))
    },
    [order]
  );

  return (
    <div className={styles.wrapper}>
      {content}
    </div>
  );
}

export default OrderDetails