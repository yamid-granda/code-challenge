export interface IInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  name: string
  label?: string
  onChange?: (value: string) => void
}