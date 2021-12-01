import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getIsLoggedIn } from '../../redux/auth/auth-selectors';

export default function PublicRoute({
  children,
  restricted = false,
  ...routeProps
}) {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const shouldRedirect = isLoggedIn && restricted;
  //   console.log(shouldRedirect);
  return (
    <Route {...routeProps}>
      {shouldRedirect ? <Redirect to="/" /> : children}
    </Route>
  );
}
