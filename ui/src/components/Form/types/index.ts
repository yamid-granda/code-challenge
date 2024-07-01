import { PropsWithChildren, ReactNode } from "react";

export interface IFormProps extends PropsWithChildren {
  className?: string
  onSubmit?: () => void
}