import { formatDate } from "@/utils/formatDate";
import { IDateFormatProps } from "./types";

export default function DateFormat(params: Readonly<IDateFormatProps>) {
  const { value } = params
  const formattedDate = formatDate(value)
  return <span>{formattedDate}</span>
};
