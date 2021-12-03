import s from './UserMenu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserName } from '../../redux/auth/auth-selectors';

import { logOut } from '../../redux/auth/auth-operations';

export default function UserMenu() {
  const name = useSelector(getUserName);
  const dispatch = useDispatch();

  return (
    <div className={s.user__container}>
      <span className={s.greeting__title}>Welcome, {name}!</span>
      <button
        type="button"
        className={s.logout__btn}
        onClick={() => dispatch(logOut())}
      >
        LogOut
      </button>
    </div>
  );
}
