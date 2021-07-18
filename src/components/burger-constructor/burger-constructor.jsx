import React from 'react';
import {
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import ingredients from '../../utils/data';
import PropTypes from 'prop-types';

class IngredientCard extends React.Component {
  render() {
    return (
      <li className={`mt-4 pl-8 ${styles.block}`}>
        <ConstructorElement 
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

IngredientCard.propTypes = {
  type: PropTypes.string,
  isLocked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
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

IngredientsList.propTypes = {
  children: PropTypes.array.isRequired
}

class Container extends React.Component {
  render() {
    return (
      <ul className={`${styles.container} `}>
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
        <Container>
          <IngredientCard
              key={`first`}
              type={null}
              name={ingredients[0].name}
              isLocked={Math.random() < 0.5}
              price={ingredients[0].price}
              image={ingredients[0].image}
              isDraged={Math.random() < 0.5}
          />
          <li>
            <IngredientsList key={`list`}
              children = {ingredients.map((item,index) =>
                index !==0 && index!==(ingredients.length - 1)&&
                <IngredientCard
                  key={`${index}`}
                  type={null}
                  name={item.name}
                  isLocked={Math.random() < 0.5}
                  price={item.price}
                  image={item.image}
                  isDraged={Math.random() < 0.5}
                />
              )}
            />
          </li>
          <IngredientCard
            key={`last`}
            type={null}
            name={ingredients[ingredients.length - 1].name}
            isLocked={Math.random() < 0.5}
            price={ingredients[ingredients.length - 1].price}
            image={ingredients[ingredients.length - 1].image}
            isDraged={Math.random() < 0.5}
          />
        </Container>
        <div className={ `${styles.row_order} mt-10 mr-4` }>
          <div className={ `${styles.total} pr-10`}>
            <span className="text text_type_digits-medium pr-2">{total}</span>
            <div className= { styles.icon }>
              <CurrencyIcon type="primary" />
            </div>
          </div>
          <Button type="primary" size="medium">
            Оформить заказ
          </Button>
        </div>
      </section>
    );
  }
}