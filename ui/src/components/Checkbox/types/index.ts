export interface ICheckboxProps {
  name: string
  value?: boolean
  label?: string
  onChange?: (value: boolean) => void
}