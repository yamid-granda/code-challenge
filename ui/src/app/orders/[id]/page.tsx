'use client'

import OrderManager from "@/modules/Orders/components/OrderManager"
import { useParams } from "next/navigation"

export default function OrderPage() {
  const params = useParams()
  const orderId: string = params.id as string
  return <OrderManager id={orderId} />
};
