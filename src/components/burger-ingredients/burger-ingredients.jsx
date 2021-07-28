import React, { useState } from 'react';
import {
  Counter,
  Tab,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import Modal from '../modal';
import IngredientDetails from '../ingredient-details';

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
    <li className={ `${styles.block_item} mb-8` } data-id={props.id} onClick={props.handleClick}>
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

const Block = ({ data, name, type, handleClick }) =>{
  return (
    <li className={`mt-10 ${styles.block}`}>
      <h3 className='text text_type_main-medium pb-6'>{name}</h3>
      <BlockList 
        children = {
          data.filter(item => item.type === type)
          .map((item) =>
            <Card
              key={`${item._id}`} image={item.image_large} name={item.name}
              price={item.price} id={item._id} handleClick={handleClick}
            />)
        }
      />
    </li>
  );
}

Block.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

const BlockList = ({ children }) => {
  return (
    <ul className={`${styles.block_list} ml-4`}>
      {children}
    </ul>
  );
}

BlockList.propTypes = {
  children: PropTypes.array.isRequired
}

const ListOfBlocks = ({ children }) => {
  return (
    <div className={ `mt-10 pr-2 ${styles.blocks_container}` }>
      <ul className={`${styles.blocks_list}`}>
        {children}
      </ul>
    </div>
  );
}

ListOfBlocks.propTypes = {
  children: PropTypes.array.isRequired
}

const BurgerIngredients = ({ data }) => {
  const [isModalActive, setModalActive] = useState(false);
  const [ingredientData, setIngredientData] = useState();

  const getIngredientDetails = (id) => {
    return data.find(item => item._id === id);
  }

  const handleCardClick = (e) => {
    const parentNode = e.currentTarget;
    const currentIngredient = getIngredientDetails(parentNode.getAttribute('data-id'));
    
    setIngredientData({
      image: currentIngredient.image_large,
      name: currentIngredient.name,
      calories: currentIngredient.calories,
      proteins: currentIngredient.proteins,
      fat: currentIngredient.fat,
      carbohydrates: currentIngredient.carbohydrates,
    });
    
    setModalActive(true);
  }

  return (
    <>
      <section className={`${styles.column} pt-10 mr-10`}>
        <h2 className='text text_type_main-large pb-5'>Соберите бургер</h2>
        <Tabs/>
        <ListOfBlocks
          children =
            {typeOfIngredients.map(
              (item,index) =>
                <Block key={`block${index}`} type={item.type} name={item.name} data={data} handleClick={handleCardClick}/>
            )}
        />
      </section>
      {isModalActive &&
        <Modal setModalActive={setModalActive} title='Детали ингредиента'>
          <IngredientDetails ingredientData={ingredientData}/>
        </Modal>
      }
    </>
  );
}

const ingredientPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
})

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ingredient: ingredientPropTypes})).isRequired,
}

export default BurgerIngredients