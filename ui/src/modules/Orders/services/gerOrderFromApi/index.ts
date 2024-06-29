import { httpRequest } from "@/clients/http";
import { IOrderReport } from "../../types";
import { GET_ORDER_API_CONFIG } from "../../configs";
import { IApiResponse } from "@/types";

interface IGetOrderFromApiConfig {
  id: string
}

export async function getOrderFromApi(
  config: IGetOrderFromApiConfig
): Promise<IApiResponse<IOrderReport>> {
  const { id } = config
  return httpRequest<IOrderReport>({
    ...GET_ORDER_API_CONFIG,
    path: `${id}/${GET_ORDER_API_CONFIG.path}`
  })
}