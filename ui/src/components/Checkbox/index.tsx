import { FormEventHandler, useState } from "react"
import { ICheckboxProps } from "./types"

export default function Checkbox(props: Readonly<ICheckboxProps>) {
  const {
    value,
    name,
    label,
    onChange,
  } = props

  const [isChecked, setIsChecked] = useState<boolean>(value || false);

  const handleChange: FormEventHandler<HTMLInputElement> = () => {
    const newValue = !isChecked
    setIsChecked(newValue)
    onChange?.(newValue)
  }

  return (
    <div className="flex items-center mb-4">
      <input
        id={name}
        name={name}
        checked={isChecked}
        type="checkbox"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        onChange={handleChange}
      />

      <label
        htmlFor={name}
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </label>
    </div>
  )
};
