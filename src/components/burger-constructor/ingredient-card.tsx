import { FC } from 'react';
import { useDispatch } from '../../services/hooks';
import { useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';

import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DELETE_SELECTED_INGREDIENT } from '../../services/actions/data-selected';

type TIngredientCardProps = {
  type: "top" | "bottom" | undefined,
  isLocked: boolean,
  isDraged: boolean,
  name: string,
  price: number,
  image: string,
  id: string,
  customID: string,
  moveCard: Function,
  index: number,
};

export const IngredientCard: FC<TIngredientCardProps> = ({ type, isLocked, isDraged, name, price, image, id, customID, moveCard, index }) => {
  const divRef = useRef<HTMLLIElement>(null);
  const [{ handlerID }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerID: monitor.getHandlerId(),
      };
    },
    hover(item: { index: number }, monitor) {
      if (!divRef.current) {
        return;
      };
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = divRef.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset: XYCoord | null = monitor.getClientOffset();
      const hoverClientY = clientOffset ? (clientOffset.y - hoverBoundingRect.top) : null;
      if (hoverClientY) {
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
      };
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

  drag(drop(divRef));

  const dispatch = useDispatch();

  const deleteIngredient = (id: string, customID: string) => {
    dispatch({
      type: DELETE_SELECTED_INGREDIENT,
      customID
    });
  }

  return (
    <li className={`mt-4 pl-8 ${styles.block} ${isDragging ? styles.block_isHover : ''}`} ref={divRef} data-handler-id={handlerID}>
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
