import { useContext } from 'react';
import { CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { DataContext } from '../../services/app-context';
import styles from './total-price.module.css';

export const TotalPrice = (indexOfChosenBun) => {
  const { dataState } = useContext(DataContext);
  const { data } = dataState;

  const total = data.reduce(
    (acc, p, index) =>
      (index !== indexOfChosenBun && p.type !== 'bun')
        ?
          (acc + p.price)
        :
          (index === indexOfChosenBun) ? (acc + p.price*2) : 0
      , 0
  );

  return (
    <div className={ `${styles.total} pr-10`}>
      <span className="text text_type_digits-medium pr-2">{total}</span>
      <div className= { styles.icon }>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  )
}
  