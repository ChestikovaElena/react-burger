import { Link, useHistory } from "react-router-dom";
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
          <h1 className="text text_type_main-large text_color_inactive">ERROR</h1>
          <h2 className="text text_type_digits-large">404</h2>
          <p className="text text_type_main-large text_color_inactive">This page is outside of the Universe</p>
          <p className="text text_type_main-medium">
            The page you are trying to access does not exist or has been moved.
            Try going back to our homepage.
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
  )
}