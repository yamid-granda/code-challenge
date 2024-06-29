import { ICurrencyFormatProps } from "./types";
import { formatCurrency } from "@/utils/formatCurrency";

export default function CurrencyFormat(params: Readonly<ICurrencyFormatProps>) {
  const { value } = params
  const formattedCurrency = formatCurrency(value)
  return <span>{formattedCurrency}</span>
};
