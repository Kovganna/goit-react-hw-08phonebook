import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const addContact = createAsyncThunk(
  'contacts/addContacts',
  async (contact, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/contacts`, contact);
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  },
);

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/contacts`);
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  },
);

// export const removeContact = createAsyncThunk(
//   'contacts/removeContact',
//   async (contactId, { rejectWithValue }) => {
//     console.log(contactId);
//     try {
//       const {
//         data: { id },
//       } = await axios.delete(`/contacts/${contactId}`);
//       return contactId;
//     } catch (error) {
//       rejectWithValue(error.message);
//     }
//   },
// );

export const removeContact = createAsyncThunk(
  'contacts/removeContact',
  async (contactId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      if (response.status === 200) {
        return contactId;
      } else {
        throw new Error({ message: 'error' });
      }
    } catch (error) {
      rejectWithValue(error.message);
    }
  },
);
