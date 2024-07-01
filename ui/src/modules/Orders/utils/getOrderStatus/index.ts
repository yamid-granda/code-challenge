import { IOrder, IOrderReport, IOrderStatus } from "../../types";

export function getOrderStatus(order: IOrderReport | IOrder): IOrderStatus {
  return order.paid ? 'Paid' : 'Pending'
}