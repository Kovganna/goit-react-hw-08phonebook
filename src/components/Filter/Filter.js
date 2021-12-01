import { useSelector, useDispatch } from 'react-redux';
import { filterContacts } from '../../redux/contacts/actions';
import { getFilter } from '../../redux/contacts/selectors';
import s from './Filter.module.css';

const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleFilterChange = e => {
    dispatch(filterContacts(e.target.value)); // отправляем значение в redux
  };

  return (
    <div className={s.filter__container}>
      <label className={s.filter__title}>
        Find contacts by name
        <input
          className={s.filter__input}
          type="text"
          value={filter}
          name="name"
          onChange={handleFilterChange}
        />
      </label>
    </div>
  );
};

export default Filter;
