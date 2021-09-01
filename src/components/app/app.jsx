import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation
} from 'react-router-dom';
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
    IngredientPage,
    OrderPage
  } from '../../pages';
import AppHeader from '../app-header';
import IngredientDetails from '../ingredient-details';
import Modal from '../modal';
import NoAuthRoute from '../no-auth-route';
import OrderDetails from '../order-details';
import ProtectedRoute from '../protected-route';
import styles from './app.module.css';
import { getUserData } from '../../services/actions/user';
import { getIngredients } from '../../services/actions/data-ingredients';

function ModalSwitch() {
  let location = useLocation();
  const history = useHistory();
  let background =
    ( history.action === 'PUSH' || history.action === 'REPLACE') &&
    location.state && location.state.background;
  
  const handleModalClose = () => {
    history.goBack();
  };

  return (
    <>
      <AppHeader />
      <main className={ styles.main }>
        <Switch location={background || location}>
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
          <Route path="/ingredients/:ingredientId" exact>
            <IngredientPage />
          </Route>
          <ProtectedRoute 
            path='/profile/orders/:orderNumber'
            children={<OrderPage />}
            exact
          />
          <ProtectedRoute
            path='/order'
            children={
              <Modal handleModalClose={handleModalClose}>
                <OrderDetails />
              </Modal>
            }
          />
          <Route>
            <NotFound404 />
          </Route>
        </Switch>

        {background && (
          <Route
            path="/ingredients/:ingredientId"
            children={
              <Modal handleModalClose={handleModalClose} title='Детали ингредиента'>
                <IngredientDetails />
              </Modal>
            }
          />
        )}
        {background && (
          <ProtectedRoute
            path='/profile/orders/:orderNumber'
            children={
              <Modal handleModalClose={handleModalClose}>
                <OrderDetails />
              </Modal>
            }
          />
        )}
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
      dispatch(getIngredients());
    },
    []
  );

  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
}

export default App;
