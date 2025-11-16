import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { orderApi, type SalesOrder, type Customer } from '../services/api';
import { setList } from '../redux/slices/orderSlice';
import { fetchCustomers } from '../redux/slices/coustomerSlice';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const orders = useAppSelector(s => s.orders.list) as SalesOrder[];
  const customers = useAppSelector(s => s.customers.list) as Customer[];

  useEffect(() => {
    const load = async () => {
      try {
        dispatch(fetchCustomers());
        const r = await orderApi.list();
        dispatch(setList(r.data));
      } catch (error) {
        console.error('Failed to load orders:', error);
      }
    };
    load();
  }, [dispatch]);

  const openEdit = (o: SalesOrder) => {
    if (!o.id) {
      alert('Invalid order');
      return;
    }
    dispatch({ type: 'orders/setCurrent', payload: o } as any);
    navigate(`/sales-order/${o.id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Home</h1>
        <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={() => navigate('/sales-order')}>
          Add New
        </button>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Invoice No</th>
            <th className="border p-2 text-left">Customer</th>
            <th className="border p-2 text-left">Date</th>
            <th className="border p-2 text-right">Total Incl</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => {
            const cust = customers.find(c => c.id === o.customerId);
            const custName = cust?.name ?? '';
            return (
              <tr
                key={o.id}
                className="hover:bg-gray-50 cursor-pointer"
                onDoubleClick={() => openEdit(o)}
              >
                <td className="border p-2">{o.invoiceNo}</td>
                <td className="border p-2">{custName}</td>
                <td className="border p-2">{o.invoiceDate}</td>
                <td className="border p-2 text-right font-medium">{(o.totalIncl ?? 0).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};