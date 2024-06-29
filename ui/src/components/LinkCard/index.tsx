import Link from "next/link";
import Card from "@/components/Card";
import { ILinkCardProps } from "./types";

export default function LinkCard(props: Readonly<ILinkCardProps>) {
  const {
    children,
    title,
    href,
  } = props

  return (
    <Link href={href}>
      <Card className="hover:bg-gray-100 dark:hover:bg-gray-700" title={title}>{children}</Card>
    </Link>
  )
};
