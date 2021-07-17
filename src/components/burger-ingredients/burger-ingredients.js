import React from 'react';
import {
  Counter,
  Tab,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';

const typeOfIngredients = [
  {type: "bun", name: "Булки"},
  {type: "sauce", name: "Соусы"},
  {type: "main", name: "Начинки"},
];

const Header = () => {
  const [current, setCurrent] = React.useState('one')
  return (
    <div style={{ display: 'flex' }}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        {typeOfIngredients[0].name}
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        {typeOfIngredients[1].name}
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        {typeOfIngredients[2].name}
      </Tab>
    </div>
  );
};

const ccc= [
  {
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
  },
  {
     "_id":"60666c42cc7b410027a1a9b5",
     "name":"Говяжий метеорит (отбивная)",
     "type":"main",
     "proteins":800,
     "fat":800,
     "carbohydrates":300,
     "calories":2674,
     "price":3000,
     "image":"https://code.s3.yandex.net/react/code/meat-04.png",
     "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
     "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
     "__v":0
  },
  {
     "_id":"60666c42cc7b410027a1a9b6",
     "name":"Биокотлета из марсианской Магнолии",
     "type":"main",
     "proteins":420,
     "fat":142,
     "carbohydrates":242,
     "calories":4242,
     "price":424,
     "image":"https://code.s3.yandex.net/react/code/meat-01.png",
     "image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png",
     "image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png",
     "__v":0
  },
  {
     "_id":"60666c42cc7b410027a1a9b7",
     "name":"Соус Spicy-X",
     "type":"sauce",
     "proteins":30,
     "fat":20,
     "carbohydrates":40,
     "calories":30,
     "price":90,
     "image":"https://code.s3.yandex.net/react/code/sauce-02.png",
     "image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
     "image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png",
     "__v":0
  }
];

class Card extends React.Component {
  render() {
    return (
      <li className={ styles.block_item }>
        <Counter count={1} size="default" />
        <div>
          <img src={this.props.image} alt={this.props.name}/>
        </div>
        <div className={`${styles.item_row} pt-1 pb-1`}>
          <span className="text text_type_digits-default pr-2">{this.props.price}</span>
          <CurrencyIcon type='primary' />
        </div>
        <h4 className={`${styles.item_title} text text_type_main-default`}>{this.props.name}</h4>
      </li>
    );
  }
}

class BlockList extends React.Component {
  render() {
    return (
      <ul className={`${styles.block_list} ml-4`}>
        {this.props.children}
      </ul>
    );
  }
}

class Block extends React.Component {
  render() {
    return (
      <div className='mt-10'>
        <h3 className='text text_type_main-medium pb-6'>{typeOfIngredients[this.props.type].name}</h3>
        <BlockList 
          children = {
            ccc.filter(item => item.type === typeOfIngredients[this.props.type].type)
            .map((item, index) =>
              <Card key={index} image={item.image_large} name={item.name} price={item.price}/>)
          }
        />
      </div>
    );
  }
}

export default class BurgerIngredients extends React.Component {
  render() {
    return (
      <section className={`${styles.column} pt-10`}>
        <h2 className='text text_type_main-large pb-5'>Соберите бургер</h2>
        <Header/>
        <Block type={2}/>
      </section>
    );
  }
}