import {
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import ingredients from '../../utils/data';
import PropTypes from 'prop-types';

const IngredientCard = (props) => {
  return (
    <li className={`mt-4 pl-8 ${styles.block}`}>
      <ConstructorElement 
        type={props.type}
        isLocked={props.isLocked}
        text={props.name}
        price={props.price}
        thumbnail={props.image}
      />
      <div className={ styles.icon_wrapper }>
        {props.isDraged&&<DragIcon type="primary" />}
      </div>
    </li>
  );
}

IngredientCard.propTypes = {
  type: PropTypes.string,
  isLocked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
}

const IngredientsList = (props) =>{
  return (
    <ul className={`${styles.ingredients_list} `}>
      {props.children}
    </ul>
  );
}

IngredientsList.propTypes = {
  children: PropTypes.array.isRequired
}

const Container = (props) => {
  return (
    <ul className={`${styles.container} `}>
      {props.children}
    </ul>
  );
}

const BurgerConstructor = () => {
  const total = ingredients.reduce((acc, p) => acc + p.price, 0);
  return (
    <section className={`${styles.column} pt-25 pl-4`}>
      <Container>
        <IngredientCard
            type={'top'}
            name={ingredients[0].name}
            isLocked={true}
            price={ingredients[0].price}
            image={ingredients[0].image}
            isDraged={false}
        />
        <li>
          <IngredientsList
            children = {ingredients.map((item,index) =>
              index !==0 && index!==(ingredients.length - 2)&&
              <IngredientCard
                key={`${index}`}
                type={null}
                name={item.name}
                isLocked={Math.random() < 0.5}
                price={item.price}
                image={item.image}
                isDraged={true}
              />
            )}
          />
        </li>
        <IngredientCard
          type={'bottom'}
          name={ingredients[0].name}
          isLocked={true}
          price={ingredients[0].price}
          image={ingredients[0].image}
          isDraged={false}
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

export default BurgerConstructor