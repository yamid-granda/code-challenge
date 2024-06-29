import { FormEventHandler } from "react";
import { IInputProps } from "./types";

export default function Input(props: Readonly<IInputProps>) {
  const {
    label,
    name,
    onChange,
    ...inputProps
  } = props

  const handleChange: FormEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement
    onChange?.(target.value)
  }

  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleChange}
        {...inputProps}
      />
    </div>
  )
}