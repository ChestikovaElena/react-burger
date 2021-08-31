import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export function NoAuthRoute({ children, ...rest }) {
  console.log(!localStorage.getItem('refreshToken'));
  return (
    <Route
      {...rest}
      render={() =>
        !localStorage.getItem('refreshToken') ? (
          children
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }
    />
  );
}

NoAuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
  rest: PropTypes.object
}