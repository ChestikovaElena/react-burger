import styles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderDetails = () => {
  return (
    <div className={styles.wrapper}>
      <p className="text text_type_digits-large mb-8">0345536</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <div className={`mb-15 ${styles.icon_wrapper}`}>
        <CheckMarkIcon type="primery"/>
      </div>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

export default OrderDetails