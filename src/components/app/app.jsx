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
    FeedInfoPage,
    FeedPage,
    ForgotPasswordPage,
    HomePage,
    IngredientPage,
    LoginPage,
    NotFound404,
    OrderPage,
    RegistrationPage,
    ResetPasswordPage,
    ProfilePage
  } from '../../pages';
import AppHeader from '../app-header';
import FeedInfoDetails from '../feed-info-details';
import IngredientDetails from '../ingredient-details';
import Modal from '../modal';
import NoAuthRoute from '../no-auth-route';
import OrderDetails from '../order-details';
import ProtectedRoute from '../protected-route';
import styles from './app.module.css';
import { getUserData } from '../../services/actions/user';
import { getIngredients } from '../../services/actions/data-ingredients';

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
          <Route path="/feed" exact>
            <FeedPage />
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
          <Route path="/feed/:orderId" exact>
            <FeedInfoPage />
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
        {background && (
          <Route
            path="/feed/:orderId"
            children={
              <Modal handleModalClose={handleModalClose}>
                <FeedInfoDetails />
              </Modal>
            }
          />
        )}
      </main>
    </>
  )
}

export default App;
