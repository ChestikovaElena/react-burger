import TotalPrice from "../total-price";
import styles from './order-card.module.css';

export const OrderCard = ({ orderInfo }) => {
  
  const { number, time,title,ingredients, cost } = orderInfo;
  return (
    <div className={`pt-6 pr-6 pb-6 pl-6 ${styles.card_wrapper}`}>
      <div className={`mb-6 ${styles.card_row}`}>
        <span className="text text_type_digits-default">{`#${number}`}</span>
        <span className="text text_type_main-default text_color_inactive">{time}</span>
      </div>
      <h3 className="text text_type_main-medium mb-6">{title}</h3>
      <div className={`${styles.card_row} ${styles.card_row_big}`}>
        <ul className={`mr-6 ${styles.card_row} `}>
          ингредиенты
        </ul>
        <TotalPrice totalPrice={cost} type="def"/>
      </div>
    </div>
  )
}