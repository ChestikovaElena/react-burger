import { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from '../../services/hooks';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
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
