import styles from './ingredient-icon.module.css';

export const IngredientIcon = ({ count, image, index, name }) => {
  const zIndex = 100 - index;
  const leftShift = index*(64 - 16);
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
          <span className={` text text_type_digits-default ${styles.icon_count}`}>
            {`+${count}`}
          </span>
        }
      </div>
    </li>
  )
}