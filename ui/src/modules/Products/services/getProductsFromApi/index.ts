import { httpRequest } from "@/clients/http";
import { IProduct } from "../../types";
import { GET_PRODUCTS_API_CONFIG } from "@/modules/Products/configs";
import { IApiResponse } from "@/types";

export async function getProductsFromApi(): Promise<IApiResponse<IProduct[]>> {
  return httpRequest<IProduct[]>(GET_PRODUCTS_API_CONFIG)
}