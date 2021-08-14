import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DELETE_SELECTED_INGREDIENT } from '../../services/actions/data-selected';

export const IngredientCard = ({ type, isLocked, isDraged, name, price, image, id, customID, moveCard, index }) => {
  const ref = useRef(null);
  const [{ handlerID }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerID: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
        return { id, index };
    },
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const dispatch = useDispatch();

  const deleteIngredient = (id, customID) => {
    dispatch({
      type: DELETE_SELECTED_INGREDIENT,
      customID
    });
  }

  return (
    <li className={`mt-4 pl-8 ${styles.block} ${isDragging ? styles.block_isHover : ''}`} ref={ref} data-handler-id={handlerID}>
      <ConstructorElement 
        type={type}
        isLocked={isLocked}
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => deleteIngredient(id, customID)}
      />
      <div className={ styles.icon_wrapper }>
        {isDraged&&<DragIcon type="primary" />}
      </div>
    </li>
  );
}

IngredientCard.propTypes = {
  type: PropTypes.string,
  isLocked: PropTypes.bool,
  isDraged: PropTypes.bool,
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  id: PropTypes.string,
  customID: PropTypes.string,
  index: PropTypes.number,
}