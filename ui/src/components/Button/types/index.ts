import { PropsWithChildren } from "react";

export interface IButtonProps extends PropsWithChildren, React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  isLoading?: boolean
  size?: 'base' | 'xs'
  className?: string
}