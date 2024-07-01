type ISelectOptionValue = string | number

export interface ISelectorOption {
  text: string
  value: ISelectOptionValue
}

export interface ISingleSelectorProps {
  options: ISelectorOption[]
  name: string
  label: string
  onChange?: (value: string | number) => void
}