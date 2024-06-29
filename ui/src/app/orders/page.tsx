'use client'

import PageTitle from "@/components/PageTitle"
import Section from "@/components/Section"
import { useEffect } from "react"
import OrdersList from "@/modules/Orders/components/OrdersList";
import Button from "@/components/Button";
import { ADD_ORDER_UI_PATH } from "@/modules/Orders/configs";

export default function OrdersPage() {
  useEffect(() => {
  }, [])

  return (
    <Section>
      <Section>
        <PageTitle>Orders</PageTitle>
      </Section>

      <Section>
        <Button href={ADD_ORDER_UI_PATH}>Add a new Order</Button>
      </Section>

      <Section>
        <OrdersList />
      </Section>
    </Section>
  )
}
