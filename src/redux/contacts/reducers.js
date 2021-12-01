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

export const error = createReducer(null, {
  [addContact.rejected]: (_, { payload }) => payload,
  [addContact.pending]: () => null,

  [fetchContacts.rejected]: (_, { payload }) => payload,
  [fetchContacts.pending]: () => null,

  [removeContact.rejected]: (_, { payload }) => payload,
  [removeContact.pending]: () => null,
});
