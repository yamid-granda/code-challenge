import { httpRequest } from "@/clients/http";
import { IRoundProductBody, IRoundProduct } from "../../types";
import { ADD_ROUND_PRODUCT_API_CONFIG } from "../../configs";

interface IAddOrderFromApiConfig {
  body: IRoundProductBody
}

export async function addRoundProductFromApi(config: IAddOrderFromApiConfig) {
  const { body } = config

  return httpRequest<IRoundProduct>({
    ...ADD_ROUND_PRODUCT_API_CONFIG,
    body,
  })
}