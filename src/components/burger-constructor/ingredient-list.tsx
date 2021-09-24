import { FC } from 'react';

import styles from './burger-constructor.module.css';

type TIngredientListProps = React.ReactNode;

export const IngredientsList: FC<TIngredientListProps> = (props) =>{
  return (
    <ul className={`${styles.ingredients_list} `}>
      {props.children}
    </ul>
  );
}
