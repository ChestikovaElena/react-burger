import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import 
  {
    HomePage,
    NotFound404,
    ProfilePage,
    LoginPage,
    RegistrationPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    IngredientPage
  } from '../../pages';
import AppHeader from '../app-header';
import styles from './app.module.css';
import ProtectedRoute from '../protected-route';
import NoAuthRoute from '../no-auth-route';
import Modal from '../modal';
import { getUserData } from '../../services/actions/user';

function ModalSwitch() {
  let location = useLocation();
  let background = location.state && location.state.background;
  console.log(background);
  console.log('----------',location.state);
  const isModalOpen = true;
  return (
    <>
      <AppHeader />
      <main className={ styles.main }>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <NoAuthRoute path="/login" exact>
            <LoginPage />
          </NoAuthRoute>
          <NoAuthRoute path="/register" exact>
            <RegistrationPage />
          </NoAuthRoute>
          <NoAuthRoute path="/forgot-password" exact>
            <ForgotPasswordPage />
          </NoAuthRoute>
          <NoAuthRoute path="/reset-password" exact>
            <ResetPasswordPage />
          </NoAuthRoute>
          <ProtectedRoute path="/profile" exact>
            <ProfilePage />
          </ProtectedRoute>
          {isModalOpen ? (
            <Route path="/ingredients/:ingredientId" exact>
              <IngredientPage />
            </Route>
            ) : (
              <Route path="/ingredients/:ingredientId" children={<Modal />}/>
            )
          }
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
        {/* {background && <Route path="/ingredients/:ingredientId" children={<Modal />}/>} */}
      </main>
    </>
  )
}

function App() {
  const dispatch = useDispatch();
  const refreshToken = localStorage.getItem('refreshToken');
  
  useEffect(
    () => {
      refreshToken && dispatch(getUserData());
    },
    [dispatch, refreshToken]
  );

  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
}

export default App;
