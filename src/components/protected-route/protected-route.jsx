import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export function ProtectedRoute({ children, ...rest }) {
  const {isLoggedIn } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn
  }));

  return (
    <Route
      {...rest}
      render={({ location }) => 
        isLoggedIn ? (
        children
      ) : (
        <Redirect
          to={{
            pathname:'/login',
            state: {from: location}
          }} />
      )}
    />
  );
}