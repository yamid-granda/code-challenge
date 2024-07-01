import { IOrderReport } from "../../types";
import { getSubtotalFromOrderRoundReport } from "../getSubtotalFromOrderRoundReport";

export function getSubtotalFromOrderReport({ rounds, products }: IOrderReport): number {
  const subtotal = rounds.reduce((total, orderReportRound) => {
    return total + getSubtotalFromOrderRoundReport({
      products,
      orderReportRound,
    })
  }, 0)

  return subtotal
}