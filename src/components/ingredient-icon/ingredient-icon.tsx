import { FC } from 'react';

import { TIngredientInUpdateOrder } from '../../services/types/data';
import Preloader from '../preloader';
import styles from './ingredient-icon.module.css';

type TIngredientIconProps = {
  item: TIngredientInUpdateOrder,
  count?: number,
  index: number,
  type: string
}

export const IngredientIcon: FC<TIngredientIconProps> = ({ item, count, index, type }) => {
  const zIndex: number = type === "shift" ? (100 - index) : 1;
  const leftShift: number = type === "shift" ? index*(64 - 16) : 0;

  return (
    (type==="shift") ? (
      <li className={`${styles.icon}`} style={{zIndex: zIndex, left: `${leftShift}px`}}>
        <div
          className={`${styles.icon_wrapper}`}>
          { item ? (
            <img
              src={item.image}
              alt={item.name}
              className=
                {count ?
                  `${styles.icon_img_hidden}`
                :
                  `${styles.icon_img}`}
            />
            ) : (
              <Preloader />
            )
          }
          {count && count !==0 &&
            <span
              className={` text text_type_digits-default ${styles.icon_count}`}
            >
              {`+${count}`}
            </span>
          }
        </div>
      </li>
    ) : (
      <div className={`${styles.icon_full}`}>
        { item ? (
          <div
            className={`${styles.icon_wrapper}`}
          >
            <img
              src={item.image}
              alt={item.name}
              className={styles.icon_img}
            />
          </div>
          ) : (
            <Preloader />
          )
        }
      </div>
    )
  )
}