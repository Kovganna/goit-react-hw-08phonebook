import { createReducer } from '@reduxjs/toolkit';
import { addContact, fetchContacts, removeContact } from './operations';
import { filterContacts } from './actions';

export const contactList = createReducer([], {
  [fetchContacts.fulfilled]: (_, { payload }) => payload,
  [addContact.fulfilled]: (state, { payload }) => [...state, payload],
  [removeContact.fulfilled]: (state, { payload }) => {
    return state.filter(({ id }) => id !== payload);
  },
});

export const contactFilter = createReducer('', {
  [filterContacts]: (_, { payload }) => payload,
});
