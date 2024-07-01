import { httpRequest } from "@/clients/http";
import { IAddOrderBody, IOrder, IRoundProductBody } from "../../types";
import { ADD_ORDER_API_CONFIG } from "../../configs";
import { IApiResponse } from "@/types";
import { addRoundFromApi } from "../addRoundFromApi";

interface IAddOrderFromApiConfig {
  body: IAddOrderBody
  roundProducts: IRoundProductBody[]
}

export async function addOrderFromApi(
  config: IAddOrderFromApiConfig,
): Promise<IApiResponse<IOrder>> {
  const { body, roundProducts } = config

  const orderResponse = await httpRequest<IOrder>({
    ...ADD_ORDER_API_CONFIG,
    body
  })

  if (!orderResponse.isOk)
    return { isOk: false }

  const roundResponse = await addRoundFromApi({
    body: { order_id: orderResponse.response.id },
    roundProducts,
  })

  if (!roundResponse.isOk)
    return { isOk: false }

  return orderResponse
}