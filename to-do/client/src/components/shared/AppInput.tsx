import { ChangeEvent } from 'react';

type InputType = 'text' | 'number' | 'password';

interface AppInputProps {
  type: InputType;
  name: string;
  id: string;
  label: string;
  value: string;
  errorMessage?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function AppInput({
  type = 'text',
  name,
  id,
  label,
  value = '',
  errorMessage,
  onChange
}: AppInputProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-gray-700 font-bold mb-2 capitalize">
        {label}
      </label>
      <input
        name={name}
        id={id}
        onChange={onChange}
        value={value}
        type={type}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none focus:ring-1 transition-all"
      />
      {errorMessage !== '' && <span className="text-red-500">{errorMessage}</span>}
    </div>
  );
}
