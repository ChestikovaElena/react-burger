import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export function NoAuthRoute({ children, ...rest }) {
  const {isLoggedIn } = useSelector((state) => ({
    isLoggedIn: state.user.isLoggedIn
  }));
  
  return (
    <Route
      {...rest}
      render={() => 
        !isLoggedIn ? (
        children
      ) : (
        <Redirect to={{ pathname: '/' }} />
      )}
    />
  );
}

NoAuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
  rest: PropTypes.object
}