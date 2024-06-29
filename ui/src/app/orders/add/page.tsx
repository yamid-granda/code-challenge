'use client'

import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import OrderCreator from "@/modules/Orders/components/OrderCreator";

export default function AddOrderPage() {
  return (
    <>
      <Section>
        <PageTitle>Add new Order</PageTitle>
        <p>Fill the following to create a new order</p>
      </Section>

      <Section>
        <OrderCreator />
      </Section>
    </>
  )
};
