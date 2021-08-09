import { useContext, useState, useEffect } from 'react';
import AppHeader from '../../components/app-header';
import BurgerIngredients from '../../components/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor';
import styles from'./home-page.module.css';
import {DataContext} from '../../services/app-context';

const HomePage = () => {
  const { dataState } = useContext(DataContext);
  const { data, isLoading, hasError } = dataState;
  const [dataSelected, setDataSelected] = useState([]);
  
  const upgradeDataSelected = (newSelectedIngredients) => {
    console.log(JSON.stringify(dataSelected));
    let newDataSelectedArray = dataSelected;
    newDataSelectedArray.push(newSelectedIngredients);
    
    setDataSelected((dataSelected) => {
      return newDataSelectedArray
    });
    // setDataSelected(newDataSelectedArray);
    console.log(JSON.stringify(dataSelected));
  }
  
  return (
    <>
      <AppHeader />
      <main className={ styles.main }>
        {data!==[] && !isLoading && !hasError &&
          <BurgerIngredients upgradeDataSelected={upgradeDataSelected}/>
        }
        { 
          <BurgerConstructor dataSelected={dataSelected} setDataSelected={setDataSelected}/>}
      </main>
    </>
  );
}

export default HomePage;