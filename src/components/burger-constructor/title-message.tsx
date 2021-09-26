import { FC } from 'react';

import styles from './burger-constructor.module.css';

type TIngredientListProps = {
  text: string | number,
  marginTop?: string
};

export const TitleMessage: FC<TIngredientListProps> = ({ text, marginTop }) => {
  return (
    <p className=
      {
        `text text_type_main-default text_color_inactive mt-${marginTop} ml-8 pt-5 pb-5 
        ${styles.title_message}`
      }
    >
      {text}
    </p>
  );
}
