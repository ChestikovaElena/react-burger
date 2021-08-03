import {useState, useContext} from 'react';
import {
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal';
import OrderDetails from '../order-details';
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
  const total = data.reduce(
    (acc, p, index) =>
      (index !== INDEXOFCHOSENBUN && p.type !== 'bun')
        ?
          (acc + p.price)
        :
          (index === INDEXOFCHOSENBUN) ? (acc + p.price*2) : 0
      , 0
  );

  const [isModalActive, setModalActive] = useState(false);

  const handleButtonClick = (e) => {
    setModalActive(true);
  }
  
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
              children = {data.map((item,index) =>
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
              )}
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
          <div className={ `${styles.total} pr-10`}>
            <span className="text text_type_digits-medium pr-2">{total}</span>
            <div className= { styles.icon }>
              <CurrencyIcon type="primary" />
            </div>
          </div>
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