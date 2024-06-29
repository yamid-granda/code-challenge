import { FormEventHandler } from "react";
import { IFormProps } from "./types";
import Card from "../Card";

export default function From(props: Readonly<IFormProps>) {
  const {
    children,
    actions,
    onSubmit,
  } = props

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    onSubmit?.()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <div className="grid gap-6 mb-6 md:grid-cols-2">{children}</div>
        {actions && <div>{actions}</div>}
      </Card>
    </form>
  )
}
