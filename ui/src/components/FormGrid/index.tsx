import { IFormGridProps } from './types';

export default function FormGrid(props: Readonly<IFormGridProps>) {
  const { children } = props
  return <div className="grid gap-6 mb-6 lg:grid-cols-2">{children}</div>
}
