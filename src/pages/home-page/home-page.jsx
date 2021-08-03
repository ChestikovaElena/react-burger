import { useContext } from 'react';
import AppHeader from '../../components/app-header';
import BurgerIngredients from '../../components/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor';
import styles from'./home-page.module.css';
import {DataContext} from '../../services/app-context';

const HomePage = () => {
  const { dataState } = useContext(DataContext);
  const { data, isLoading, hasError } = dataState;
  return (
    <>
      <AppHeader />
      <main className={ styles.main }>
        {data!==[] && !isLoading && !hasError && <BurgerIngredients />}
        {data!==[] && !isLoading && !hasError && <BurgerConstructor />}
      </main>
    </>
  );
}

export default HomePage;