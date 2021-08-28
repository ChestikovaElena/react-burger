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
          <h1 className="text text_type_main-large text_color_inactive">Такой страницы у нас нет</h1>
          <p className="text text_type_main-medium text_color_inactive">Похоже вы допустили опечатку, набирая адрес, 
            или воспользовались неисправной ссылкой.
          </p>
          <div>
            <p className="text text_type_main-medium mb-5">
              Возможно здесь найдется то, что вам нужно
            </p>
            <Button
              type="primary"
              size="large"
              onClick={goToHomePage}
            >
              Go to home page
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}