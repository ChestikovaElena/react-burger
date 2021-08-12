import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DELETE_SELECTED_INGREDIENT, DECREASE_COUNT } from '../../services/actions';

export const IngredientCard = (props) => {
  
  const dispatch = useDispatch();
  const deleteIngredient = (id, customID) => {
    dispatch({
      type: DELETE_SELECTED_INGREDIENT,
      customID
    });
    dispatch({
      type: DECREASE_COUNT,
      id
    });
  }
  return (
    <li className={`mt-4 pl-8 ${styles.block}`}>
      <ConstructorElement 
        type={props.type}
        isLocked={props.isLocked}
        text={props.name}
        price={props.price}
        thumbnail={props.image}
        handleClose={() => deleteIngredient(props.id, props.customID)}
      />
      <div className={ styles.icon_wrapper }>
        {props.isDraged&&<DragIcon type="primary" />}
      </div>
    </li>
  );
}

IngredientCard.propTypes = {
  type: PropTypes.string,
  isLocked: PropTypes.bool,
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  id: PropTypes.string,
  customID: PropTypes.string,
}