interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}
export const Select: React.FC<Props> = ({ label, children, ...p }) => (
  <div className="flex flex-col">
    {label && <label className="text-sm font-medium mb-1">{label}</label>}
    <select className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" {...p}>
      {children}
    </select>
  </div>
);