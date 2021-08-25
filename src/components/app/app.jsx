import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <AppHeader />
      <main className={ styles.main }>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/register" exact>
            <RegistrationPage />
          </Route>
          <Route path="/forgot-password" exact>
            <ForgotPasswordPage />
          </Route>
          <Route path="/reset-password" exact>
            <ResetPasswordPage />
          </Route>
          <ProtectedRoute path="/profile" exact>
            <ProfilePage />
          </ProtectedRoute>
          <Route path="/ingredients/:id" exact>
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
