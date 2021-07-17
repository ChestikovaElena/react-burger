import React from 'react';
import {
  Counter,
  Tab,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import ingredients from '../../utils/data';

const typeOfIngredients = [
  {type: "bun", name: "Булки"},
  {type: "sauce", name: "Соусы"},
  {type: "main", name: "Начинки"},
];

const Header = () => {
  const [current, setCurrent] = React.useState('one')
  return (
    <div style={{ display: 'flex', justifyContent: 'spaceBetween'}}>
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
      <li className='mt-10'>
        <h3 className='text text_type_main-medium pb-6'>{this.props.name}</h3>
        <BlockList 
          children = {
            ingredients.filter(item => item.type === this.props.type)
            .map((item, index) =>
              <Card key={index} image={item.image_large} name={item.name} price={item.price}/>)
          }
        />
      </li>
    );
  }
}

class ListOfBlocks extends React.Component {
  render() {
    return (
      <ul className={`${styles.blocks_list}`}>
        {this.props.children}
      </ul>
    );
  }
}

export default class BurgerIngredients extends React.Component {
  render() {
    return (
      <section className={`${styles.column} pt-10`}>
        <h2 className='text text_type_main-large pb-5'>Соберите бургер</h2>
        <Header/>
        <ListOfBlocks
          children = {typeOfIngredients.map((item,index) => <Block key={index} type={item.type} name={item.name}/>)}
        />
        
      </section>
    );
  }
}