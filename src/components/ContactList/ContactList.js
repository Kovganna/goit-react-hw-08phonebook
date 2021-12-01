import s from './ContactList.module.css';
import { fetchContacts, removeContact } from '../../redux/contacts/operations';
import { getFilteredContacts } from '../../redux/contacts/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function ContactList() {
  const contacts = useSelector(getFilteredContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <ul className="contact-list">
        {contacts.map(({ name, number, id }) => (
          <li key={id} className={s.contact__item}>
            <p className={s.item}>{name}:</p>
            <p className={s.item}>{number}</p>
            <button
              key={id}
              type="button"
              className={s.onClick__btn}
              onClick={() => dispatch(removeContact(id))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
