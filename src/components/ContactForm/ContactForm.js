import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getContacts } from '../../redux/contacts/selectors';
import { addContact } from '../../redux/contacts/operations';

import s from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        return setName(value);

      case 'number':
        return setNumber(value);

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const allReadyPresentContact = contacts.find(
      elem => elem.name.toLowerCase() === name.toLowerCase(),
    );

    if (allReadyPresentContact) {
      alert(`${name} is already in contacts.`);
    } else {
      dispatch(addContact({ name, number }));
    }
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <div className={s.contact__form}>
      <form className={s.input__form} onSubmit={handleSubmit}>
        <label>
          <span className={s.input__title}>Name</span>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            className={s.input__name}
            value={name}
            onChange={handleChange}
          />
        </label>
        <label>
          <span className={s.input__title}>Number</span>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            className={s.input__number}
            value={number}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className={s.btn__add}>
          Add contact
        </button>
      </form>
    </div>
  );
}

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};
