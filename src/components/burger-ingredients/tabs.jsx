import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { typeOfIngredients } from './type-of-ingredients';

export const Tabs = ({ current, setCurrent }) => {
  const content = useMemo(
    () => {
      return (
        <>
          <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
            {typeOfIngredients[0].name}
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
            {typeOfIngredients[1].name}
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={setCurrent}>
            {typeOfIngredients[2].name}
          </Tab>
        </>
      )
    },
    [current, setCurrent]
  );
  return (
    <div className={ `${styles.header} mb-10` }>
      {content}
    </div>
  );
};

Tabs.propTypes = {
  current: PropTypes.string.isRequired,
  setCurrent: PropTypes.func.isRequired,
}