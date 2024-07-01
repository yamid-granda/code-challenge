import { httpRequest } from "@/clients/http";
import { IAddRoundBody, IOrder, IRoundProductBody } from "../../types";
import { ADD_ROUND_API_CONFIG } from "../../configs";
import { addRoundProductFromApi } from "../addRoundProductFromApi";
import { IApiResponse } from "@/types";

interface IAddOrderFromApiConfig {
  body: IAddRoundBody
  roundProducts: IRoundProductBody[]
}

export async function addRoundFromApi(
  config: IAddOrderFromApiConfig,
): Promise<IApiResponse<IOrder>> {
  const { body, roundProducts } = config

  const roundResponse = await httpRequest<IOrder>({
    ...ADD_ROUND_API_CONFIG,
    body
  })

  if (!roundResponse.isOk)
    return { isOk: false }

  const addProductPromises = roundProducts.map(product => addRoundProductFromApi({
    body: {
      ...product,
      round_id: roundResponse.response.id
    }
  }))

  const addProductResponses = await Promise.allSettled(addProductPromises)
  const hasProductsError = addProductResponses.some(response =>
    response.status === 'rejected' || !response.value.isOk
  )

  if (hasProductsError)
    return { isOk: false }

  return roundResponse
}