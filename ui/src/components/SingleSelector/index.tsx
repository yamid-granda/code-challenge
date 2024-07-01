import { FormEventHandler } from "react";
import { ISingleSelectorProps } from "./types";

export default function SingleSelector(props: Readonly<ISingleSelectorProps>) {
  const {
    name,
    options,
    onChange,
    label,
  } = props


  const handleChange: FormEventHandler<HTMLSelectElement> = (e) => {
    const target = e.target as HTMLSelectElement
    let value: string | number = target.value

    if (typeof options[0].value === 'number')
      value = Number(value)

    onChange?.(value)
  }

  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option></option>
        {options.map(({ text, value }) => <option key={value} value={value}>{text}</option>)}
      </select>
    </div>
  )
};
