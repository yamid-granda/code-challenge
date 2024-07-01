import Link from "next/link";
import { IButtonProps } from "./types";
import Loader from "../Loader";
import classNames from "classnames";

export default function Button(props: Readonly<IButtonProps>) {
  const {
    children,
    href,
    isLoading,
    size,
    className,
    ...buttonProps
  } = props

  const sizeConfig = size || 'base'

  const buttonLayout = (
    <button
      className={classNames('flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 disabled:cursor-not-allowed disabled:opacity-25', {
        'px-5 text-sm min-h-10': sizeConfig === 'base',
        'px-3 text-xs min-h-8': sizeConfig === 'xs',
      }, className)}
      disabled={isLoading}
      {...buttonProps}
    >
      {isLoading && <span className="mr-2 -ml-4"><Loader /></span>} {children}
    </button>
  )

  return href
    ? <Link href={href}>{buttonLayout}</Link>
    : buttonLayout
};
