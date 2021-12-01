import { createSelector } from '@reduxjs/toolkit';

export const getContacts = state => state.contacts.contactList;

export const getFilter = state => state.contacts.contactFilter;

export const getFilteredContacts = createSelector(
  [getContacts, getFilter],
  (contactList, contactFilter) => {
    const lowerCasedFilter = contactFilter.toLowerCase();
    return contactList.filter(({ name }) =>
      name.toLowerCase().includes(lowerCasedFilter),
    );
  },
);
