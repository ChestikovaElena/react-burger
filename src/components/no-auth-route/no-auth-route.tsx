import { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

export const NoAuthRoute: FC<RouteProps> = ({ children, ...rest }) => {
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
