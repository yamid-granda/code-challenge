import { httpRequest } from "@/clients/http";
import { IPublicDocument } from "@/types";
import { IAddOrderBody, IOrder } from "../../types";
import { MARK_PAID_ORDER_API_CONFIG } from "../../configs";

interface IMarkPaidOrderFromApi {
  id: IPublicDocument['id']
}

export async function markPaidOrderFromApi({ id }: IMarkPaidOrderFromApi) {
  return httpRequest<IOrder, IAddOrderBody>({
    ...MARK_PAID_ORDER_API_CONFIG,
    path: `${id}`,
    body: { paid: true }
  })
}