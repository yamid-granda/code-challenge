import { useEffect, useMemo, useState } from "react"
import { IOrder } from "@/modules/Orders/types";
import { getOrdersFromApi } from "@/modules/Orders/services/getOrdersFromApi";
import Loader from "@/components/Loader";
import { ITableHeader } from "@/components/Table/types";
import Table from "@/components/Table";
import DateFormat from "@/components/DateFormat";
import CurrencyFormat from "@/components/CurrencyFormat";
import { useRouter } from "next/navigation";
import { ORDERS_UI_PATH } from "../../configs";

const headers: ITableHeader[] = [
  { text: 'Status', value: 'paid' },
  { text: 'id', value: 'id' },
  { text: 'Date', value: 'created' },
  { text: 'Discounts', value: 'discounts' },
];

export default function OrdersLis() {
  const router = useRouter()

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getOrders() {
    const apiResponse = await getOrdersFromApi()
    setIsLoading(false)

    if (!apiResponse.isOk) {
      return
    }

    setOrders(apiResponse.response)
  }

  const rows = useMemo(() => {
    return orders.map(order => ({
      ...order,
      created: <DateFormat value={order.created} />,
      discounts: <CurrencyFormat value={order.discounts} />,
      paid: order.paid ? 'Paid' : 'Pending'
    }))
  }, [orders])

  useEffect(() => {
    getOrders()
  }, [])

  type IOrderRow = typeof rows[0]

  function onRowClick(row: IOrderRow) {
    router.push(`${ORDERS_UI_PATH}/${row.id}`)
  }

  return isLoading
    ? <Loader />
    : <Table
      headers={headers}
      rows={rows}
      onRowClick={onRowClick}
    />
};
