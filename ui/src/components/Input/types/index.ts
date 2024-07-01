import { Dispatch, SetStateAction } from "react"

export interface IInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  name: string
  label?: string
  value?: string | number,
  onChange?: Dispatch<any>
}