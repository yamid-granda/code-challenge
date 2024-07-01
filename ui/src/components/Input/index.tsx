import { FormEventHandler, useEffect, useState } from "react";
import { IInputProps } from "./types";

export default function Input(props: Readonly<IInputProps>) {
  const {
    label,
    name,
    onChange,
    value: initialValue,
    className,
    ...inputProps
  } = props

  const [value, setValue] = useState<string | number>(initialValue ?? '');

  useEffect(() => {
    if (initialValue !== undefined)
      setValue(initialValue as string | number)
  }, [initialValue])

  const handleChange: FormEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement
    let value: string | number = target.value

    if (inputProps.type === 'number')
      value = Number(value)

    setValue(target.value)
    onChange?.(value)
  }

  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>

      <input
        value={value}
        id={name}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleChange}
        {...inputProps}
      />
    </div>
  )
}