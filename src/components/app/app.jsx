import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import { getUserData } from '../../services/actions/user';

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
          <Route path="/ingredients/:ingredientId" exact>
            <IngredientPage />
          </Route>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
