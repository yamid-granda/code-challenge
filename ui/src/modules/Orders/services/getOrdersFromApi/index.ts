import { httpRequest } from "@/clients/http";
import { GET_ORDERS_API_CONFIG } from "../../configs";
import { IOrderReport } from "../../types";
import { IApiResponse } from "@/types";

interface IGetOrdersFromApiConfig {
  urlSearchParams?: URLSearchParams
}

export async function getOrdersFromApi(config: IGetOrdersFromApiConfig = {}): Promise<IApiResponse<IOrderReport[]>> {
  const { urlSearchParams } = config

  return httpRequest<IOrderReport[]>({
    ...GET_ORDERS_API_CONFIG,
    urlSearchParams,
  })
}