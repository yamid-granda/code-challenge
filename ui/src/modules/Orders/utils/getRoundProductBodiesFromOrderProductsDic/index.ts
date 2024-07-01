import { IOrderProduct, IRoundProductBody } from "../../types";

export function getRoundProductBodyFromOrderProduct(
  orderProduct: IOrderProduct,
): IRoundProductBody {
  return {
    price: 0,
    product_id: orderProduct.id,
    quantity: orderProduct.quantity,
    round_id: 0
  }
}

export function getRoundProductBodiesFromOrderProductsDic(
  orderProductsDic: Record<string, IOrderProduct>,
): IRoundProductBody[] {
  return Object.values(orderProductsDic).map(getRoundProductBodyFromOrderProduct)
}