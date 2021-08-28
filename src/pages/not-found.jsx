import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import styles from './not-found.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

export const NotFound404 = () => {
  const history = useHistory();

  const goToHomePage = useCallback(
    () => {
        history.replace({ pathname: '/' });
    },
    [history]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className="text text_type_main-large text_color_inactive">ОШИБКА</h1>
          <h2 className="text text_type_digits-large">404</h2>
          <p className="text text_type_main-medium text_color_inactive">Эта страница находится за пределами Галактики</p>
          <div>
            <p className="text text_type_main-default text_color_inactive mb-5">
              Попробуйте вернуться на домашнюю страницу.
            </p>
            <Button
              type="primary"
              size="large"
              onClick={goToHomePage}
            >
              На домашнюю страницу
            </Button>
          </div>
        </div>
        <div className={`${styles.spin} ${styles.spin_1}`}>
          <div className={`${styles.burger} ${styles.burger_1}`}></div>
        </div>
        <div className={`${styles.spin} ${styles.spin_2}`}>
          <div className={`${styles.burger} ${styles.burger_2}`}></div>
        </div>
        <div className={`${styles.spin} ${styles.spin_3}`}>
          <div className={`${styles.burger} ${styles.burger_3}`}></div>
        </div>
        <div className={`${styles.spin} ${styles.spin_4}`}>
          <div className={`${styles.burger} ${styles.burger_4}`}></div>
        </div>
      </div>
    </div>
  )
}