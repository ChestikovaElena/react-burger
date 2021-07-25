import React, {useEffect, useState} from 'react';
import HomePage from '../../pages/home-page';
import Modal from '../modal';
import ModalOverlay from '../modal-overlay';

function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });
  const [isModalActive, setModalActive] = useState(true);
  const API_SOURCE = 'https://norma.nomoreparties.space/api/ingredients';

  useEffect(() => {
    getIngredients()
  }, []);

  const getIngredients = () => {
    setState({...state, hasError: false, isLoading: true});
    fetch(API_SOURCE)
      .then(result => result.json())
      .then(result => setState({...state, data: result.data, isLoading: false}))
      .catch(error => setState({...state, hasError: true, isLoading: false}));
  }

  return (
    <div>
      <HomePage data={state.data} isLoading={state.isLoading} hasError={state.hasError}/>
      {isModalActive && <ModalOverlay active={isModalActive} setModalActive={setModalActive}/>}
    </div>
  );
}

export default App;
