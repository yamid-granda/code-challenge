import { ICardProps } from "./types";

export default function Card(props: Readonly<ICardProps>) {
  const {
    children,
    title,
    className,
  } = props

  return (
    <div className={`block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${className}`}>
      {title && <h5 className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">{title}</h5>}
      {children && <div className="font-normal text-gray-700 dark:text-gray-400">{children}</div>}
    </div>
  )
};
