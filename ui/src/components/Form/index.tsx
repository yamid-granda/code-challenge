import { FormEventHandler } from "react";
import { IFormProps } from "./types";
import Card from "../Card";

export default function From(props: Readonly<IFormProps>) {
  const {
    children,
    onSubmit,
    className,
  } = props

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    onSubmit?.()
  }

  return (
    <form
      className={className}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  )
}
