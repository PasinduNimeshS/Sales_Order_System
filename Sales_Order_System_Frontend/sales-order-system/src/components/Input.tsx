interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
export const Input: React.FC<Props> = ({ label, ...p }) => (
  <div className="flex flex-col">
    {label && <label className="text-sm font-medium mb-1">{label}</label>}
    <input className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" {...p} />
  </div>
);