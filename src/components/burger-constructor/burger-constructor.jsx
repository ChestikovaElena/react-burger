import {useState, useContext, useEffect, useReducer, useMemo} from 'react';
import {
  ConstructorElement,
  Button,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal';
import OrderDetails from '../order-details';
import TotalPrice from '../total-price';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import {DataContext} from '../../services/app-context';

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
  const { dataState } = useContext(DataContext);
  const { data } = dataState;

  const INDEXOFCHOSENBUN = 0;

  const [isModalActive, setModalActive] = useState(false);

  const handleButtonClick = (e) => {
    setModalActive(true);
  }

  const totalPriceInitialState = { totalPrice: 0 };

  function reducer(state, action) {
    switch (action.type) {
      case 'set':
        return { totalPrice: action.payload };
      case 'reset':
        return totalPriceInitialState;
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const [totalPriceState, totalPriceDispatch] = useReducer(reducer, totalPriceInitialState, undefined);

  useEffect(() => {
    const totalPrice = data.reduce(
      (sum, item, index) =>
        (index !== INDEXOFCHOSENBUN && item.type !== 'bun')
          ?
            (sum + item.price)
          :
            (index === INDEXOFCHOSENBUN) ? (sum + item.price*2) : 0
        , 0
    );
    totalPriceDispatch({ type: 'set', payload: totalPrice });
    }, [data]
  );

  const content = useMemo(
    () => data.map((item,index) =>
      index !== INDEXOFCHOSENBUN && item.type !== 'bun' &&
      <IngredientCard
        key={`${item._id}`}
        type={null}
        name={item.name}
        isLocked={false}
        price={item.price}
        image={item.image}
        isDraged={true}
      />
    ), [data]
  );

  return (
    <>
      <section className={`${styles.column} pt-25 pl-4`}>
        <Container>
          {data[INDEXOFCHOSENBUN] && <IngredientCard
            type={'top'}
            name={`${data[INDEXOFCHOSENBUN].name} (верх)`}
            isLocked={true}
            price={data[INDEXOFCHOSENBUN].price}
            image={data[INDEXOFCHOSENBUN].image}
            isDraged={false}
          />}
          <li>
            <IngredientsList
              children = {content}
            />
          </li>
          {data[INDEXOFCHOSENBUN] && <IngredientCard
            type={'bottom'}
            name={`${data[INDEXOFCHOSENBUN].name} (низ)`}
            isLocked={true}
            price={data[INDEXOFCHOSENBUN].price}
            image={data[INDEXOFCHOSENBUN].image}
            isDraged={false}
          />}
        </Container>
        <div className={ `${styles.row_order} mt-10 mr-4` }>
          <TotalPrice totalPrice={totalPriceState.totalPrice}/>
          <Button type="primary" size="medium" onClick={handleButtonClick}>
            Оформить заказ
          </Button>
        </div>
      </section>
      {isModalActive && 
        <Modal setModalActive={setModalActive} title=''>
          <OrderDetails />
        </Modal>
      }
    </>
  );
}

export default BurgerConstructor