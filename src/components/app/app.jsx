import { useEffect, useState } from 'react';
import HomePage from '../../pages/home-page';

function App() {
  // const [dataState, setDataState] = useState({
  //   isLoading: false,
  //   hasError: false,
  //   data: [],
  // });
  // const API_SOURCE = 'https://norma.nomoreparties.space/api/ingredients';

  // useEffect(() => {
  //   getIngredients()
  // }, []);

  // const getIngredients = () => {
  //   setDataState({...dataState, hasError: false, isLoading: true});
  //   fetch(API_SOURCE)
  //     .then(result => {
  //                       if (result.ok) {
  //                         return result.json();
  //                       } return Promise.reject(`Ошибка ${result.status}`);
  //                     })
  //     .then(result => setDataState({...dataState, data: result.data, isLoading: false}))
  //     .catch(error => setDataState({...dataState, hasError: true, isLoading: false}));
  // }

  return (
    <div>
      <HomePage />
    </div>
  );
}

export default App;
