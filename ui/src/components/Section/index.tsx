import classNames from "classnames"
import { ISectionProps } from "./types"

export default function Section(params: Readonly<ISectionProps>) {
  const { children, className } = params

  return (
    <div className={classNames('mb-4', className)}>
      {children}
    </div>
  )
};
