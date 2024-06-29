import { httpRequest } from "@/clients/http";
import { IAddProductBody, IProduct } from "../../types";
import { ADD_PRODUCT_API_CONFIG } from "../../configs";
import { IApiResponse } from "@/types";

interface IAddProductFromApiConfig {
  body: IAddProductBody
}

export async function addProductFromApi(
  config: IAddProductFromApiConfig,
): Promise<IApiResponse<IProduct>> {
  const { body } = config

  return httpRequest<IProduct>({
    ...ADD_PRODUCT_API_CONFIG,
    body
  })
}
