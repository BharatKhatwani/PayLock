"use client";

type SelectProps = {
  onSelect: (value: string) => void;
  options: { key: string; value: string }[];
  disabled?: boolean;   // ✅ optional
};

export const Select = ({ onSelect, options, disabled }: SelectProps) => {
  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      disabled={disabled}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    >
      {options.map((opt) => (
        <option key={opt.key} value={opt.value}>
          {opt.value}
        </option>
      ))}
    </select>
  );
};
