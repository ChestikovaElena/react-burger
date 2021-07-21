import React from 'react';
import {
  Counter,
  Tab,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import ingredients from '../../utils/data';
import PropTypes from 'prop-types';

const typeOfIngredients = [
  {type: "bun", name: "Булки"},
  {type: "sauce", name: "Соусы"},
  {type: "main", name: "Начинки"},
];

const Tabs = () => {
  const [current, setCurrent] = React.useState('one')
  return (
    <div className={ `${styles.header} mb-10` }>
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

const Card = (props) =>{
  return (
    <li className={ `${styles.block_item} mb-8` }>
      <Counter count={1} size="default" />
      <div>
        <img src={props.image} alt={props.name}/>
      </div>
      <div className={`${styles.item_row} pt-1 pb-1`}>
        <span className="text text_type_digits-default pr-2">{props.price}</span>
        <CurrencyIcon type='primary' />
      </div>
      <h4 className={`${styles.item_title} text text_type_main-default`}>{props.name}</h4>
    </li>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
}

const Block = (props) =>{
  return (
    <li className={`mt-10 ${styles.block}`}>
      <h3 className='text text_type_main-medium pb-6'>{props.name}</h3>
      <BlockList 
        children = {
          ingredients.filter(item => item.type === props.type)
          .map((item, index) =>
            <Card key={`${item._id}`} image={item.image_large} name={item.name} price={item.price}/>)
        }
      />
    </li>
  );
}

Block.propTypes = {
  name: PropTypes.string.isRequired
}

const BlockList = (props) => {
  return (
    <ul className={`${styles.block_list} ml-4`}>
      {props.children}
    </ul>
  );
}

BlockList.propTypes = {
  children: PropTypes.array.isRequired
}

const ListOfBlocks = (props) => {
  return (
    <div className={ `mt-10 pr-2 ${styles.blocks_container}` }>
      <ul className={`${styles.blocks_list}`}>
        {props.children}
      </ul>
    </div>
  );
}

ListOfBlocks.propTypes = {
  children: PropTypes.array.isRequired
}

const BurgerIngredients = () => {
  return (
    <section className={`${styles.column} pt-10 mr-10`}>
      <h2 className='text text_type_main-large pb-5'>Соберите бургер</h2>
      <Tabs/>
      <ListOfBlocks
        children = {typeOfIngredients.map((item,index) => <Block key={`block${index}`} type={item.type} name={item.name}/>)}
      />
    </section>
  );
}

export default BurgerIngredients