'use client'

import LinkCard from "@/components/LinkCard";
import { OrdersTitle } from "@/modules/Orders/components/OrdersTitle";
import { ORDERS_UI_PATH } from "@/modules/Orders/configs";
import StockTitle from "@/modules/Products/components/ProductsTitle";
import { PRODUCTS_UI_PATH } from "@/modules/Products/configs";

export default function Home() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <LinkCard href={ORDERS_UI_PATH} title={<OrdersTitle />}>
        What is your next order ?, manage your orders queue.
      </LinkCard>

      <LinkCard href={PRODUCTS_UI_PATH} title={<StockTitle />}>
        Check the current quantity of all your products.
      </LinkCard >
    </div >
  );
}
