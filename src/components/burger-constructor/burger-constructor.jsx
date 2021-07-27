import {useEffect, useState} from 'react';
import {
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';

const IngredientCard = (props) => {
  return (
    <li className={`mt-4 pl-8 ${styles.block}`} data-id={props.id}>
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
  const [isModalActive, setModalActive] = useState(false);
  const [modalType, setModalType] = useState();
  const [ingredientData, setIngredientData] = useState();

  const getIngredientDetails = (id) => {
    return data.find(item => item._id === id);
  }

  const handleIngredientClick = (e) => {
    e.stopPropagation();

    if (e.target.classList.item(0)&&e.target.classList.item(0).includes('constructor-element')) {
      const parentNode = e.target.closest('[data-id]');
      const currentIngredient = getIngredientDetails(parentNode.getAttribute('data-id'));
      setModalType('ingredientDetails');
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
  }

  useEffect(() =>{
    document.addEventListener('click', handleIngredientClick)

    return () => {
      document.removeEventListener('click', handleIngredientClick)
    }
  })

  const handleButtonClick = (e) => {
    setModalActive(true);
    setModalType('orderDetails');
  }
  
  return (
    <>
      <section className={`${styles.column} pt-25 pl-4`}>
        <Container>
          {data[INDEXOFCHOSENBUN] && <IngredientCard
              type={'top'}
              name={data[INDEXOFCHOSENBUN].name}
              id={data[INDEXOFCHOSENBUN]._id}
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
                  id={item._id}
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
            id={data[INDEXOFCHOSENBUN]._id}
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
        {isModalActive && 
          <ModalOverlay
            active={isModalActive}
            setModalActive={setModalActive}
            modalType={modalType}
            ingredientData={ingredientData}
          />
        }
      </section>
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

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ingredient: ingredientPropTypes})).isRequired,
}

export default BurgerConstructor