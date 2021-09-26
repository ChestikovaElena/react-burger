import { FC } from 'react';
import styles from './order-card.module.css';

type TImgredientListProps = {
  children: React.ReactNode
}

export const IngredientList: FC<TImgredientListProps> = ({ children }) => {
  return (
    <ul className={`mr-6 ${styles.card_list} `}>
      {children}
    </ul>
  )
}