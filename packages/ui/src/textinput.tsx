"use client";

type TextInputProps = {
  placeholder: string;
  onChange: (value: string) => void;
  label: string;
  type?: string;        // default "text"
  min?: string;
  value?: string | number;
  disabled?: boolean;
};

export const TextInput = ({
  placeholder,
  onChange,
  label,
  type = "text",
  min,
  value,
  disabled,
}: TextInputProps) => {
  return (
    <div className="pt-2">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        type={type}
        min={min}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
    </div>
  );
};
