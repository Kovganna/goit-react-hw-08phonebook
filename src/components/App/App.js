import { Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from 'react-loader-spinner';
import AppBar from '../AppBar/AppBar';
import Container from '../Container/Container';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../../redux/auth/auth-operations';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getIsFetchCurrentUser,
  getIsToken,
} from '../../redux/auth/auth-selectors';
import './App.css';
import PrivateRoute from '../PrivatRoute/PrivatRoute';
import PublicRoute from '../PublicRoute/PublicRoute';

const HomeView = lazy(() =>
  import('../../views/HomeView/HomeView' /* webpackChunkName: "home-view" */),
);
const SignUpView = lazy(() =>
  import(
    '../../views/SignUpView/SignUpView' /* webpackChunkName: "sign-up-view" */
  ),
);

const LoginView = lazy(() =>
  import(
    '../../views/LoginView/LoginView' /* webpackChunkName: "login-view" */
  ),
);

const PhoneView = lazy(() =>
  import(
    '../../views/PhoneView/PhoneView' /* webpackChunkName: "phone-view" */
  ),
);

export default function App() {
  const dispatch = useDispatch();
  const isFetchCurrentUser = useSelector(getIsFetchCurrentUser);
  const isToken = useSelector(getIsToken);
  console.log(isFetchCurrentUser);
  // const isFetchCurrentUser = false;

  useEffect(() => {
    if (isToken) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, isToken]);

  return !isFetchCurrentUser ? (
    <div className="Container">
      <AppBar />

      <Container>
        <Suspense fallback={<Loader />}>
          <Switch>
            <PublicRoute exact path="/">
              <HomeView />
            </PublicRoute>
            <PublicRoute exact path="/signup" restricted>
              <SignUpView />
            </PublicRoute>
            <PublicRoute exact path="/login" restricted redirectTo="/contacts">
              <LoginView />
            </PublicRoute>
            <PrivateRoute path="/contacts" redirectTo="/login">
              <PhoneView />
            </PrivateRoute>
          </Switch>
        </Suspense>
      </Container>

      <ToastContainer />
    </div>
  ) : (
    <Loader />
  );
}
