import { ISectionProps } from "./types"

export default function Section(params: Readonly<ISectionProps>) {
  const { children } = params

  return (
    <div className="mb-4">
      {children}
    </div>
  )
};
