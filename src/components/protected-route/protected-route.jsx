import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

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

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  rest: PropTypes.object
}