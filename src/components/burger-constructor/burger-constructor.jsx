import {
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
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

const BurgerConstructor = ({ data }) => {
  const INDEXOFCHOSENBUN = 0;
  const total = data.reduce(
    (acc, p, index) => index !== INDEXOFCHOSENBUN ? (acc + p.price) : (acc + p.price*2), 0
  );
  return (
    <section className={`${styles.column} pt-25 pl-4`}>
      <Container>
        {data[INDEXOFCHOSENBUN] && <IngredientCard
            type={'top'}
            name={data[INDEXOFCHOSENBUN].name}
            isLocked={true}
            price={data[INDEXOFCHOSENBUN].price}
            image={data[INDEXOFCHOSENBUN].image}
            isDraged={false}
        />}
        <li>
          <IngredientsList
            children = {data.map((item,index) =>
              index !==INDEXOFCHOSENBUN && index!==(data.length - 1)&&
              <IngredientCard
                key={`${item._id}`}
                type={null}
                name={item.name}
                isLocked={false}
                price={item.price}
                image={item.image}
                isDraged={true}
              />
            )}
          />
        </li>
        {data[INDEXOFCHOSENBUN] && <IngredientCard
          type={'bottom'}
          name={data[INDEXOFCHOSENBUN].name}
          isLocked={true}
          price={data[INDEXOFCHOSENBUN].price}
          image={data[INDEXOFCHOSENBUN].image}
          isDraged={false}
        />}
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

const ingredientPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
})

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ingredient: ingredientPropTypes})).isRequired,
}

export default BurgerConstructor