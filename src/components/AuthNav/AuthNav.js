import { NavLink } from 'react-router-dom';
import s from './AuthNav.module.css';

export default function AuthNav() {
  return (
    <div className={s.nav__container}>
      <NavLink
        to="/signup"
        className={s.navLink}
        activeClassName={s.activeLink}
      >
        SignUp
      </NavLink>
      <NavLink to="/login" className={s.navLink} activeClassName={s.activeLink}>
        LogIn
      </NavLink>
    </div>
  );
}
