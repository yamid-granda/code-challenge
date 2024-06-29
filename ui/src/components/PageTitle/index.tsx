import { IPageTitleProps } from "./types";

export default function PageTitle(props: Readonly<IPageTitleProps>) {
  const { children } = props
  return <h4 className="text-2xl font-bold dark:text-white mb-2">{children}</h4>
}
