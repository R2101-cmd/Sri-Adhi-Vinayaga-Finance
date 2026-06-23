import { FaSearch } from 'react-icons/fa';

export default function SearchBar({ value, onChange }) {
  return (
    <label className="relative block">
      <span className="sr-only">Search by vehicle number</span>
      <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-emeraldDeep/45" />
      <input
        className="focus-ring w-full rounded-lg border border-emeraldDeep/15 bg-white py-4 pl-11 pr-4 font-semibold text-charcoal shadow-sm outline-none placeholder:text-charcoal/40"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search vehicle name or model"
      />
    </label>
  );
}
