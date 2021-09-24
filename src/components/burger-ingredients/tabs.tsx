import { FC, useMemo } from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { TTab, typeOfIngredients } from './type-of-ingredients';

type TTabProps = {
  current: TTab | string,
  setTab: (current: TTab | string ) => void,
};

export const Tabs: FC<TTabProps> = ({ current, setTab }) => {
  const content = useMemo(
    () => {
      return (
        <>
          <Tab value = {typeOfIngredients[0].type} active={current === 'bun'} onClick={setTab}>
            {typeOfIngredients[0].name}
          </Tab>
          <Tab value={typeOfIngredients[1].type} active={current === 'sauce'} onClick={setTab}>
            {typeOfIngredients[1].name}
          </Tab>
          <Tab value={typeOfIngredients[2].type} active={current === 'main'} onClick={setTab}>
            {typeOfIngredients[2].name}
          </Tab>
        </>
      )
    },
    [current, setTab]
  );
  return (
    <div className={ `${styles.header} mb-10` }>
      {content}
    </div>
  );
};
