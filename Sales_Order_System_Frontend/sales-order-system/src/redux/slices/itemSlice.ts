import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { itemApi } from '../../services/api';
import { type Item } from '../../services/api';

export const fetchItems = createAsyncThunk('items/fetch', async () => {
  const { data } = await itemApi.getAll();
  return data;
});

const itemSlice = createSlice({
  name: 'items',
  initialState: { list: [] as Item[], loading: false },
  reducers: {},
  extraReducers: (b) => b.addCase(fetchItems.fulfilled, (s, a) => { s.list = a.payload; }),
});

export default itemSlice.reducer;