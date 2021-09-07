import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Preloader from '../preloader';
import TotalPrice from '../total-price';
import styles from './ingredient-icon.module.css';

export const IngredientIcon = ({ id, count, index, type }) => {
  const zIndex = type === "shift" ? (100 - index) : 1;
  const leftShift = type === "shift" && index*(64 - 16);
  const { data } = useSelector((state) => ({
    data: state.data.data
  }));
  const [ingredientData, setIngredientData] = useState(null);

  useEffect(
    async () => {
      let ingredientDataValue = null;
      if (data.length) {
        const soughtArray =  await [...data].filter(item => item._id === id);
        if (soughtArray && soughtArray.length) {
          ingredientDataValue = soughtArray[0];
        }
      }
      setIngredientData(ingredientDataValue);
    },
    [id, data]
  )

  // const clickHandler = () => {
  //   setIndexes(
  //     {
  //       firstIndex: indexes.firstIndex + 5,
  //       lastIndex: indexes.lastIndex + 5
  //     }
  //   )
  // }

  return (
    (type==="shift") ? (
      <li className={`${styles.icon}`} style={{zIndex: zIndex, left: `${leftShift}px`}}>
        <div
          className={`${styles.icon_wrapper}`}>
          { ingredientData ? (
            <img
              src={ingredientData.image_mobile}
              alt={ingredientData.name}
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
      <div className={`mb-4 ${styles.icon_full}`}>
        { ingredientData ? (
          <div
            className={`${styles.icon_wrapper}`}
          >
            <img
              src={ingredientData.image_mobile}
              alt={ingredientData.name}
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