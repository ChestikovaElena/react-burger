import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export function ProtectedRoute({ children, ...rest }) {
  const {isLoggedIn } = useSelector((state) => ({
    isLoggedIn: state.auth.isLoggedIn
  }));

  return (
    <Route
      {...rest}
      render={() => 
        isLoggedIn ? (
        children
      ) : (
        <Redirect to='login' />
      )}
    />
  );
}