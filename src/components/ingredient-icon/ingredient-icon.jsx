import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Preloader from '../preloader';
import styles from './ingredient-icon.module.css';

export const IngredientIcon = ({ item, count, index, type }) => {
  const zIndex = type === "shift" ? (100 - index) : 1;
  const leftShift = type === "shift" && index*(64 - 16);

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
          {count &&
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