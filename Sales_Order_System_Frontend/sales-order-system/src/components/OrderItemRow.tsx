import { useAppDispatch, useAppSelector } from '../hooks';
import { updateRow, removeRow, selectItem } from '../redux/slices/orderSlice';
import { type Item } from '../services/api';
import { Select, Input } from '.';

interface Props {
  idx: number;
  items: Item[];
}

export const OrderItemRow: React.FC<Props> = ({ idx, items }) => {
  const dispatch = useAppDispatch();
  const row = useAppSelector(s => s.orders.current?.items[idx]);

  // Guard against undefined row
  if (!row) return null;

  const set = (field: keyof typeof row, value: any) =>
    dispatch(updateRow({ idx, field, value }));

  const pick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const it = items.find(i => i.code === e.target.value || i.description === e.target.value);
    if (it) dispatch(selectItem({ idx, item: it }));
  };

  return (
    <tr className="border-b">
      <td className="p-1">
        <Select className="w-full text-xs" value={row.itemCode} onChange={pick}>
          <option value="">--</option>
          {items.map(i => (
            <option key={i.id} value={i.code}>{i.code}</option>
          ))}
        </Select>
      </td>

      <td className="p-1">
        <Select className="w-full text-xs" value={row.description} onChange={pick}>
          <option value="">--</option>
          {items.map(i => (
            <option key={i.id} value={i.description}>{i.description}</option>
          ))}
        </Select>
      </td>

      <td className="p-1">
        <Input
          className="w-full text-xs"
          value={row.note}
          onChange={e => set('note', e.target.value)}
        />
      </td>

      <td className="p-1">
        <Input
          type="number"
          className="w-full text-xs"
          value={row.quantity}
          onChange={e => set('quantity', +e.target.value)}
        />
      </td>

      <td className="p-1 text-right">{row.price.toFixed(2)}</td>

      <td className="p-1">
        <Input
          type="number"
          className="w-full text-xs"
          value={row.taxRate}
          onChange={e => set('taxRate', +e.target.value)}
        />
      </td>

      <td className="p-1 text-right">{row.exclAmount.toFixed(2)}</td>
      <td className="p-1 text-right">{row.taxAmount.toFixed(2)}</td>
      <td className="p-1 text-right">{row.inclAmount.toFixed(2)}</td>

      <td className="p-1 text-center">
        <button
          className="text-red-600 text-xs"
          onClick={() => dispatch(removeRow(idx))}
        >
          X
        </button>
      </td>
    </tr>
  );
};