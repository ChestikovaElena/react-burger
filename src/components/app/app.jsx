import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
import ListOfOrders from '../list-of-orders';
import Modal from '../modal';
import NoAuthRoute from '../no-auth-route';
import OrderDetails from '../order-details';
import ProtectedRoute from '../protected-route';
import ProfileForm from "../profile-form";
import styles from './app.module.css';
import { getUserData } from '../../services/actions/user';
import { getIngredients } from '../../services/actions/data-ingredients';
import { 
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED
} from '../../services/actions/ws';
import { processOrders } from '../../utils/process-orders';

function App() {
  const dispatch = useDispatch();
  const { data, orders } = useSelector((store) => ({
    data: store.data.data,
    orders: store.ws.orders
  }));

  const refreshToken = localStorage.getItem('refreshToken');
  
  useEffect(
    () => {
      refreshToken && dispatch(getUserData());
      dispatch(getIngredients());
      dispatch({
        type: WS_CONNECTION_START
      });
      return () => {
        dispatch({
          type: WS_CONNECTION_CLOSED
        })
      }
    },
    []
  );

  useEffect(
    () => {
      if (orders && orders.length !== 0) {
        processOrders(data, dispatch, orders)
      };
    },
    [orders]
  )

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
      <main className={ `${styles.main}` }>
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
            <ProfilePage
              textInfo="В этом разделе вы можете изменить свои персональные данные"
            >
              <ProfileForm />
            </ProfilePage>
          </ProtectedRoute>
          <Route path="/ingredients/:ingredientId" exact>
            <IngredientPage />
          </Route>
          <Route path="/feed/:orderId" exact>
            <FeedInfoPage />
          </Route>
          <ProtectedRoute path="/profile/orders" exact>
            <ProfilePage
              textInfo="В этом разделе вы можете просмотреть свою историю заказов"
            >
              <ListOfOrders page="profile"/>
            </ProfilePage>
          </ProtectedRoute>
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
            path='/profile/orders/:orderId'
            children={
              <Modal handleModalClose={handleModalClose} width="640" page="profile">
                <FeedInfoDetails />
              </Modal>
            }
          />
        )}
        {background && (
          <Route
            path="/feed/:orderId"
            children={
              <Modal handleModalClose={handleModalClose} width="640">
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
