import React, { FC } from 'react';

import styles from './ingredient-details.module.css';
import { TIngredient } from '../../services/types/data';

type TFeature = {
  id: number,
  name: string,
  measure: string,
  valueName: keyof TIngredient
}

export const productFeatures: TFeature[] = [
  {
    id: 0,
    name: 'Калории',
    measure: 'ккал',
    valueName: 'calories'
  },
  {
    id: 1,
    name: 'Белки',
    measure: 'г',
    valueName: 'proteins'
  },
  {
    id: 2,
    name: 'Жиры',
    measure: 'г',
    valueName: 'fat'
  },
  {
    id: 3,
    name: 'Углеводы',
    measure: 'г',
    valueName: 'carbohydrates'
  },
];

type TFeatureProps = {
  name: string,
  measure: string,
  value: string | number
};

export const Feature: FC<TFeatureProps> = ({ name, measure, value }) => {
  return (
    <li className='text text_type_main-default text_color_inactive'>
      <div className={`${styles.feature_row}`}>
        <span>{`${name},`}</span>
        <span>{measure}</span>
      </div>
      <span>{value}</span>
    </li>
  )
}

type TListOfFeaturesProps = React.ReactNode;

export const ListOfFeatures: FC<TListOfFeaturesProps> = ({ children }) => {console.log(children);
  return (
    <ul className={styles.features}>
      {children}
    </ul>
  );
}

