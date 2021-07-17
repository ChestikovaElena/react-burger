import React from 'react';
import AppHeader from '../../components/app-header';
import BurgerIngredients from '../../components/burger-ingredients';

class HomePage extends React.Component {
  render() {
    return (
      <>
        <AppHeader />
        <main>
          <BurgerIngredients />
        </main>
      </>
    );
  }
}

export default HomePage;