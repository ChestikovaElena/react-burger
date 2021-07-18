import React from 'react';
import {
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import ingredients from '../../utils/data';

class IngredientCard extends React.Component {
  render() {
    return (
      <li className={`mt-4 ${styles.block}`}>
        <ConstructorElement style={{background: 'green'}}
          type={this.props.type}
          isLocked={this.props.isLocked}
          text={this.props.name}
          price={this.props.price}
          thumbnail={this.props.image}
        />
        <div className={ styles.icon_wrapper }>
          {this.props.isDraged&&<DragIcon type="primary" />}
        </div>
      </li>
    );
  }
}

class IngredientsList extends React.Component {
  render() {
    return (
      <ul className={`${styles.ingredients_list} `}>
        {this.props.children}
      </ul>
    );
  }
}

class List extends React.Component {
  render() {
    return (
      <ul className={`${styles.list} ml-8 `}>
        {this.props.children}
      </ul>
    );
  }
}

export default class BurgerConstructor extends React.Component {
  render() {
    const total = ingredients.reduce((acc, p) => acc + p.price, 0)
    return (
      <section className={`${styles.column} pt-25 pl-4`}>
        <List>
          <IngredientCard 
            key={'ingredient0'}
            type={null}
            name={ingredients[0].name}
            isLocked={Math.random() < 0.5}
            price={ingredients[0].price}
            image={ingredients[0].image}
            isDraged={Math.random() < 0.5}
          />
          <IngredientsList
            key={`list1`}
            children = {ingredients.map((item,index) =>
              index !==0 && index!==(ingredients.length - 1) ?
              <IngredientCard
                key={`ingr${index}`}
                type={null}
                name={item.name}
                isLocked={Math.random() < 0.5}
                price={item.price}
                image={item.image}
                isDraged={Math.random() < 0.5}
              />
              :
              <></>
            )}
          />
          <IngredientCard 
            key={`ingredient${ingredients.length - 1}`}
            type={null}
            name={ingredients[ingredients.length - 1].name}
            isLocked={Math.random() < 0.5}
            price={ingredients[ingredients.length - 1].price}
            image={ingredients[ingredients.length - 1].image}
            isDraged={Math.random() < 0.5}
          />
        </List>
        <div className={ `${styles.row_order} mt-10 mr-4` }>
          <div className={ `${styles.total} pr-10`}>
            <span className="text text_type_digits-medium pr-2">{total}</span>
            <div className= { styles.icon }><CurrencyIcon type="primary" /></div>
          </div>
          <Button type="primary" size="medium">
            Оформить заказ
          </Button>
        </div>
      </section>
    );
  }
}