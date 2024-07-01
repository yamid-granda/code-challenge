import { IOrderReportProducts, IOrderReportRound } from "../../types";

interface IGetSubtotalFromOrderRoundReport {
  products: IOrderReportProducts
  orderReportRound: IOrderReportRound
}

export function getSubtotalFromOrderRoundReport(config: IGetSubtotalFromOrderRoundReport): number {
  const { products, orderReportRound } = config
  return orderReportRound
    .round_products
    .reduce((roundTotal, { quantity, product_id }) => roundTotal + (quantity * products[product_id].price), 0)
}