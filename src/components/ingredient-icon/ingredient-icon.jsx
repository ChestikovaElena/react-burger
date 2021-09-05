import styles from './ingredient-icon.module.css';

export const IngredientIcon = ({ indexes, setIndexes, count, image, index, name, viewIndex }) => {
  const zIndex = 100 - index;
  const leftShift = viewIndex*(64 - 16);

  const clickHandler = () => {
    setIndexes(
      {
        firstIndex: indexes.firstIndex + 5,
        lastIndex: indexes.lastIndex + 5
      }
    )
  }

  return (
    <li className={`${styles.icon}`} style={{zIndex: zIndex, left: `${leftShift}px`}}>
      <div
        className={`${styles.icon_wrapper}`}>
        <img
          src={image}
          alt={name}
          className=
            {count ?
              `${styles.icon_img_hidden}`
            :
              `${styles.icon_img}`}
        />
        {count &&
          <span
            className={` text text_type_digits-default ${styles.icon_count}`}
            onClick={clickHandler}
          >
            {`+${count}`}
          </span>
        }
      </div>
    </li>
  )
}