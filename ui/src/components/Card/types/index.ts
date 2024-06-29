import { PropsWithChildren, ReactNode } from "react";

export interface ICardProps extends PropsWithChildren {
  title?: ReactNode
  className?: string
}