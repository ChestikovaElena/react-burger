import AppHeader from '../../components/app-header';
import BurgerIngredients from '../../components/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor';
import styles from'./home-page.module.css';

const HomePage = ({ data }) => {
  return (
    <>
      <AppHeader />
      <main className={ styles.main }>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data}/>
      </main>
    </>
  );
}

export default HomePage;