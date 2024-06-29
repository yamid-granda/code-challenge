import { httpRequest } from "@/clients/http";
import { GET_ORDERS_API_CONFIG } from "../../configs";
import { IOrder } from "../../types";
import { IApiResponse } from "@/types";

export async function getOrdersFromApi(): Promise<IApiResponse<IOrder[]>> {
  return httpRequest<IOrder[]>(GET_ORDERS_API_CONFIG)
}