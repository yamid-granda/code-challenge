import { useEffect, useMemo, useState } from "react"
import { IOrderReport } from "@/modules/Orders/types";
import { getOrdersFromApi } from "@/modules/Orders/services/getOrdersFromApi";
import Loader from "@/components/Loader";
import { ITableHeader } from "@/components/Table/types";
import Table from "@/components/Table";
import DateFormat from "@/components/DateFormat";
import CurrencyFormat from "@/components/CurrencyFormat";
import { useRouter } from "next/navigation";
import { ORDERS_UI_PATH } from "../../configs";
import Button from "@/components/Button";
import Section from "@/components/Section";
import { IApiResponseMetadata } from "@/types";
import { getOrderStatus } from "../../utils/getOrderStatus";
import { getSubtotalFromOrderReport } from "../../utils/getSubtotalFromOrderReport";

const headers: ITableHeader[] = [
  { text: 'Status', value: 'paid' },
  { text: 'Date', value: 'created' },
  { text: 'Subtotal', value: 'subtotal' },
  { text: 'Discounts', value: 'discounts' },
  { text: 'Total', value: 'total' },
];

export default function OrdersLis() {
  const router = useRouter()

  const [orders, setOrders] = useState<IOrderReport[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [apiMetadata, setApiMetadata] = useState<IApiResponseMetadata>({
    count: 0,
    next: '',
    previous: '',
  });

  const rows = useMemo(() => {
    return orders.map(order => {
      const subtotal = getSubtotalFromOrderReport(order)
      const total = subtotal - order.discounts

      return {
        ...order,
        created: <DateFormat value={order.created} />,
        subtotal: <CurrencyFormat value={subtotal} />,
        total: <CurrencyFormat value={total} />,
        discounts: order.discounts ? <CurrencyFormat value={-order.discounts} /> : '',
        paid: getOrderStatus(order)
      }
    })
  }, [orders])

  useEffect(() => {
    getOrders()
  }, [])

  type IOrderRow = typeof rows[0]

  function onRowClick(row: IOrderRow) {
    router.push(`${ORDERS_UI_PATH}/${row.id}`)
  }

  async function getOrders(urlSearchParams?: URLSearchParams) {
    const apiResponse = await getOrdersFromApi({ urlSearchParams })
    setIsLoading(false)

    if (!apiResponse.isOk) return

    setOrders(apiResponse.response)
    setApiMetadata(apiResponse.metadata)
  }

  async function onNextClick() {
    if (!apiMetadata.next) return
    const url = new URL(apiMetadata.next)
    await getOrders(url.searchParams)
  }

  async function onPreviousClick() {
    if (!apiMetadata.previous) return
    const url = new URL(apiMetadata.previous)
    await getOrders(url.searchParams)
  }

  return isLoading
    ? <Loader />
    : (
      <>
        <Section>
          <Table
            headers={headers}
            rows={rows}
            onRowClick={onRowClick}
          />
        </Section>

        <Section className="flex gap-4">
          <Button onClick={onPreviousClick}>Go to Previous Page</Button>
          <Button onClick={onNextClick}>Go to Next Page</Button>
        </Section>
      </>
    )
};
