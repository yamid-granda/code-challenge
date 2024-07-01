import { httpRequest } from "@/clients/http";
import { IPublicDocument } from "@/types";
import { IOrder, IUpdateOrderBody } from "../../types";
import { MARK_PAID_ORDER_API_CONFIG } from "../../configs";

interface IMarkPaidOrderFromApi {
  id: IPublicDocument['id']
  body: IUpdateOrderBody
}

export async function updateOrderFromApi({ id, body }: IMarkPaidOrderFromApi) {
  return httpRequest<IOrder, IUpdateOrderBody>({
    ...MARK_PAID_ORDER_API_CONFIG,
    path: `${id}`,
    body,
  })
}