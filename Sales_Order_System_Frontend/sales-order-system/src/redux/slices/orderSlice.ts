import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { toSLDateString } from '../../utils/format';
import { orderApi } from '../../services/api';
import { type SalesOrder, type OrderItem, type Customer, type Item } from '../../services/api';

interface State {
  current: SalesOrder | null;
  list: SalesOrder[];
  loading: boolean;
}

// Async thunk to fetch order by ID
export const fetchOrder = createAsyncThunk(
  'orders/fetchOrder',
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await orderApi.get(id);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to load order');
    }
  }
);

const emptyOrder = (): SalesOrder => ({
  id: 0,
  invoiceNo: `INV-${Date.now()}`,
  invoiceDate: new Date().toISOString().split('T')[0],
  customerId: 0,
  customerName: '',
  address1: '', address2: '', address3: '', suburb: '', state: '', postCode: '',
  referenceNo: '', note: '',
  items: [],
  totalExcl: 0, totalTax: 0, totalIncl: 0,
});

const calcLine = (i: OrderItem) => {
  const excl = i.quantity * i.price;
  const tax = excl * i.taxRate / 100;
  i.exclAmount = excl;
  i.taxAmount = tax;
  i.inclAmount = excl + tax;
};

const calcTotals = (o: SalesOrder) => {
  o.totalExcl = o.items.reduce((s, i) => s + i.exclAmount, 0);
  o.totalTax  = o.items.reduce((s, i) => s + i.taxAmount, 0);
  o.totalIncl = o.items.reduce((s, i) => s + i.inclAmount, 0);
};

const slice = createSlice({
  name: 'orders',
  initialState: { current: null, list: [], loading: false } as State,
  reducers: {
    reset: (state) => {
      state.current = emptyOrder();
      state.loading = false;
    },
    setList: (state, action: PayloadAction<SalesOrder[]>) => {
      state.list = action.payload;
    },
    selectCustomer: (state, action: PayloadAction<Customer>) => {
      if (!state.current) return;
      const c = action.payload;
      state.current.customerId = c.id;
      state.current.customerName = c.name;
      state.current.address1 = c.address1;
      state.current.address2 = c.address2;
      state.current.address3 = c.address3;
      state.current.suburb = c.suburb;
      state.current.state = c.state;
      state.current.postCode = c.postCode;
    },
    updateField: (state, action: PayloadAction<{ field: keyof SalesOrder; value: any }>) => {
      if (!state.current) return;
      (state.current as any)[action.payload.field] = action.payload.value;
    },
    addRow: (state) => {
      state.current?.items.push({
        itemCode: '', description: '', note: '', quantity: 1,
        price: 0, taxRate: 0, exclAmount: 0, taxAmount: 0, inclAmount: 0,
      });
    },
    removeRow: (state, action: PayloadAction<number>) => {
      state.current?.items.splice(action.payload, 1);
      if (state.current) calcTotals(state.current);
    },
    updateRow: (state, action: PayloadAction<{ idx: number; field: keyof OrderItem; value: any }>) => {
      if (!state.current) return;
      const i = state.current.items[action.payload.idx];
      (i as any)[action.payload.field] = action.payload.value;
      calcLine(i);
      calcTotals(state.current);
    },
    selectItem: (state, action: PayloadAction<{ idx: number; item: Item }>) => {
      if (!state.current) return;
      const { idx, item } = action.payload;
      const row = state.current.items[idx];
      row.itemCode = item.code;
      row.description = item.description;
      row.price = item.price;
      calcLine(row);
      calcTotals(state.current);
    },
    calculateTotals: (state) => {
      if (state.current) calcTotals(state.current);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        const order = action.payload;
        const safeDate = toSLDateString(order.invoiceDate);
        if (safeDate) {
          order.invoiceDate = safeDate;
        }
        state.current = order;
        state.loading = false;
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.current = emptyOrder();
        state.loading = false;
      });
  },
});

export const {
  reset, setList,
  selectCustomer, updateField,
  addRow, removeRow, updateRow, selectItem,
  calculateTotals,
} = slice.actions;

export default slice.reducer;