import { PropsWithChildren, ReactNode } from "react";

export interface IFormProps extends PropsWithChildren {
  actions?: ReactNode
  onSubmit?: () => void
}