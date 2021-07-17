import React from 'react';
import {
  Counter,
  Tab,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';

const Header = () => {
  const [current, setCurrent] = React.useState('one')
  return (
    <div style={{ display: 'flex' }}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
};

const ccc= {
  "_id":"60666c42cc7b410027a1a9b1",
  "name":"Краторная булка N-200i",
  "type":"bun",
  "proteins":80,
  "fat":24,
  "carbohydrates":53,
  "calories":420,
  "price":1255,
  "image":"https://code.s3.yandex.net/react/code/bun-02.png",
  "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
  "__v":0
};

class Card extends React.Component {
  render() {
    return (
      <li className={ styles.item }>
        <Counter count={1} size="default" />
        <div>
          <img src={ccc.image_large} alt={ccc.name}/>
        </div>
        <div className={`${styles.item_row} pt-1 pb-1`}>
          <span className="text text_type_digits-default pr-2">{ccc.price}</span>
          <CurrencyIcon type='primary' />
        </div>
        <h4 className={`${styles.item_row} text text_type_main-default`}>{ccc.name}</h4>
      </li>
    )
  }
}

export default class BurgerIngredients extends React.Component {
  render() {
    return (
      <section>
        <h2>Соберите бургер</h2>
        <Header/>
        <Card/>
      </section>
    );
  }
}