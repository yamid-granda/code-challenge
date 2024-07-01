import { IProduct } from "@/modules/Products/types";

export const PRODUCTS: IProduct[] = [
  {
    "id": 1,
    "name": "Corona",
    "price": 130.0,
    "quantity": 0,
    "product_type_id": 1
  },
  {
    "id": 2,
    "name": "Poker",
    "price": 60.0,
    "quantity": 0,
    "product_type_id": 1
  },
  {
    "id": 3,
    "name": "Orange",
    "price": 123.0,
    "quantity": 258,
    "product_type_id": null
  },
  {
    "id": 5,
    "name": "Smirnoff",
    "price": 5.0,
    "quantity": 0,
    "product_type_id": null
  },
  {
    "id": 6,
    "name": "Andina",
    "price": 1.0,
    "quantity": 100,
    "product_type_id": null
  },
  {
    "id": 7,
    "name": "Cool",
    "price": 2.0,
    "quantity": 195,
    "product_type_id": null
  },
  {
    "id": 8,
    "name": "Blue",
    "price": 3.0,
    "quantity": 296,
    "product_type_id": null
  },
  {
    "id": 9,
    "name": "Zero",
    "price": 200.0,
    "quantity": 0,
    "product_type_id": null
  },
  {
    "id": 10,
    "name": "twi",
    "price": 55.0,
    "quantity": 552,
    "product_type_id": null
  },
  {
    "id": 11,
    "name": "NEW",
    "price": 55.0,
    "quantity": 4997,
    "product_type_id": null
  }
]

export const ADD_ORDER_RESPONSE = { "id": 130, "created": "2024-07-01T20:41:09.642092Z", "paid": false, "discounts": 0.0 }
export const ADD_ROUND_RESPONSE = { "id": 132, "created": "2024-07-01T20:41:09.656584Z", "order_id": 130 }
export const ADD_ROUND_PRODUCT_RESPONSE = { "id": 77, "quantity": 1, "price": 123.0, "round_id": 132, "product_id": 4 }
