'use client'

import Button from "@/components/Button";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import OrderAggregator from "@/modules/Orders/components/OrderAggregator";
import { ORDERS_UI_PATH } from "@/modules/Orders/configs";

export default function AddOrderPage() {
  return (
    <>
      <Section>
        <PageTitle>Add a new Order</PageTitle>
        <p>Fill the following form to create a new order</p>
      </Section>

      <Section>
        <OrderAggregator />
      </Section>

      <Section>
        <Button href={ORDERS_UI_PATH}>Go to Orders List</Button>
      </Section>
    </>
  )
};
