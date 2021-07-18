import React from 'react';
import AppHeader from '../../components/app-header';
import BurgerIngredients from '../../components/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor';
import styles from'./home-page.module.css';

class HomePage extends React.Component {
  render() {
    return (
      <>
        <AppHeader />
        <main className={ styles.main }>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </>
    );
  }
}

export default HomePage;