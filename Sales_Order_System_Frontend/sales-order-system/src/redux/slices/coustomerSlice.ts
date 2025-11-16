import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customerApi } from '../../services/api';
import { type Customer } from '../../services/api';

export const fetchCustomers = createAsyncThunk('customers/fetch', async () => {
  const { data } = await customerApi.getAll();
  return data;
});

const customerSlice = createSlice({
  name: 'customers',
  initialState: { list: [] as Customer[], loading: false },
  reducers: {},
  extraReducers: b => b.addCase(fetchCustomers.fulfilled, (s, a) => { s.list = a.payload; }),
});

export default customerSlice.reducer;