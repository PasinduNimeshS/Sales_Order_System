import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchCustomers } from '../redux/slices/coustomerSlice';
import { fetchItems } from '../redux/slices/itemSlice';
import { reset, fetchOrder, calculateTotals, updateField, addRow, selectCustomer, selectItem } from '../redux/slices/orderSlice';
import { orderApi} from '../services/api';
import { toSLDateString } from '../utils/format';
import { Input, Select, OrderItemRow } from '../components';

export const SalesOrderPage = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { current, loading } = useAppSelector(s => s.orders);
  const { list: customers } = useAppSelector(s => s.customers);
  const { list: items } = useAppSelector(s => s.items);

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchItems());

    if (id) {
      dispatch(fetchOrder(+id));
    } else {
      dispatch(reset());
    }
  }, [dispatch, id]);

  // Auto-fill customer details if not filled
  useEffect(() => {
    if (current && current.customerName && !current.address1) {
      const customer = customers.find(c => c.name === current.customerName);
      if (customer) {
        dispatch(selectCustomer(customer));
      }
    }
  }, [current, customers, dispatch]);

  // Auto-fill item description if not filled
  useEffect(() => {
    if (current && current.items.length > 0) {
      current.items.forEach((item, idx) => {
        if (item.itemCode && !item.description) {
          const foundItem = items.find(i => i.code === item.itemCode);
          if (foundItem) {
            dispatch(selectItem({ idx, item: foundItem }));
          }
        }
      });
    }
  }, [current, items, dispatch]);

  const save = async () => {
    if (!current || loading) return;
    dispatch(calculateTotals());
    try {
      if (current.id) {
        await orderApi.update(current);
      } else {
        await orderApi.create(current);
      }
      navigate('/');
    } catch (error) {
      alert('Failed to save order');
    }
  };

  const cancel = () => {
    navigate('/');
  };

  const print = () => window.print();

  if (loading) return <div className="p-4 text-center">Loading order...</div>;
  if (!current) return <div className="p-4 text-center text-red-600">Order not found</div>;

  const isEdit = !!current.id;

  return (
    <div className="max-w-5xl mx-auto p-4 print:p-0">
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-gray-800 pb-2 mb-4 print:border-b print:pb-1">
        <h1 className="text-xl font-bold">Sales Order</h1>
        <div className="print:hidden space-x-2">
          {isEdit && (
            <button className="bg-red-600 text-white px-4 py-1 rounded" onClick={cancel}>
              Cancel
            </button>
          )}
          <button className="bg-green-600 text-white px-4 py-1 rounded" onClick={save}>
            {isEdit ? 'Update Order' : 'Save Order'}
          </button>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        {/* LEFT: Customer Info */}
        <div className="space-y-3">
          <Select
            label="Customer Name"
            value={current.customerId}
            onChange={e => {
              const customer = customers.find(c => c.id === +e.target.value);
              if (customer) dispatch(selectCustomer(customer));
            }}
          >
            <option value="">-- Select --</option>
            {customers.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </Select>

          <Input label="Address 1" value={current.address1} readOnly />
          <Input label="Address 2" value={current.address2} readOnly />
          <Input label="Address 3" value={current.address3} readOnly />
          <Input label="Suburb" value={current.suburb} readOnly />
          <Input label="State" value={current.state} readOnly />
          <Input label="Post Code" value={current.postCode} readOnly />
        </div>

        {/* RIGHT: Invoice Info */}
        <div className="space-y-3">
          <Input
            label="Invoice No."
            value={current.invoiceNo}
            onChange={e => {
              const formatted = toSLDateString(e.target.value);
              if (formatted) {
                dispatch(updateField({ field: 'invoiceDate', value: formatted }));
              }
            }}
          />
          <Input
            label="Invoice Date"
            type="date"
            value={current.invoiceDate}
            onChange={e => dispatch(updateField({ field: 'invoiceDate', value: e.target.value }))}
          />
          <Input
            label="Reference No"
            value={current.referenceNo}
            onChange={e => dispatch(updateField({ field: 'referenceNo', value: e.target.value }))}
          />
          <div>
            <label className="block text-sm font-medium mb-1">Note</label>
            <textarea
              className="border border-gray-300 rounded w-full h-32 resize-none p-2 text-sm"
              value={current.note}
              onChange={e => dispatch(updateField({ field: 'note', value: e.target.value }))}
            />
          </div>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full border text-sm mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Item Code</th>
            <th className="border p-2 text-left">Description</th>
            <th className="border p-2 text-left">Note</th>
            <th className="border p-2 text-left">Quantity</th>
            <th className="border p-2 text-left">Price</th>
            <th className="border p-2 text-left">Tax %</th>
            <th className="border p-2 text-left">Excl Amount</th>
            <th className="border p-2 text-left">Tax Amount</th>
            <th className="border p-2 text-left">Incl Amount</th>
            <th className="border p-2 print:hidden"></th>
          </tr>
        </thead>
        <tbody>
          {current.items.map((_, i) => (
            <OrderItemRow
              key={i}
              idx={i}
              items={items}
            />
          ))}
        </tbody>
      </table>

      <div className="print:hidden mb-4">
        <button
          className="text-blue-600 text-sm hover:underline"
          onClick={() => dispatch(addRow())}
        >
          + Add Item
        </button>
      </div>

      {/* Totals */}
      <div className="flex justify-end mt-4">
        <div className="w-48 space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Excl</span>
            <input
              className="border border-gray-300 rounded w-32 text-right px-2 py-1"
              value={current.totalExcl.toFixed(2)}
              readOnly
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Tax</span>
            <input
              className="border border-gray-300 rounded w-32 text-right px-2 py-1"
              value={current.totalTax.toFixed(2)}
              readOnly
            />
          </div>
          <div className="flex justify-between items-center font-bold">
            <span>Total Incl</span>
            <input
              className="border border-gray-300 rounded w-32 text-right px-2 py-1 font-bold"
              value={current.totalIncl.toFixed(2)}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Print Button (same as Create) */}
      <div className="mt-6 print:hidden">
        <button className="bg-gray-200 px-6 py-2 rounded" onClick={print}>Print Order</button>
      </div>
    </div>
  );
};