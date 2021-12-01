import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import s from './Navigation.module.css';
import { getIsLoggedIn } from '../../redux/auth/auth-selectors';

const Navigation = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return (
    <nav>
      <NavLink
        exact
        to="/"
        className={s.navLink}
        activeClassName={s.activeLink}
      >
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink
          exact
          to="/contacts"
          className={s.navLink}
          activeClassName={s.activeLink}
        >
          Phonebook
        </NavLink>
      )}

      <hr />
    </nav>
  );
};

export default Navigation;
