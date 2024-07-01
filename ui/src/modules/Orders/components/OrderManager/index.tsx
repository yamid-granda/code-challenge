import { useEffect, useMemo, useState } from "react";
import { IOrderReport, IOrderReportFormattedProduct, IOrderReportProduct } from "../../types";
import { getOrderFromApi } from "../../services/getOrderFromApi";
import Loader from "@/components/Loader";
import { IOrderManagerProps } from "./types";
import Table from "@/components/Table";
import { ITableHeader } from "@/components/Table/types";
import DateFormat from "@/components/DateFormat";
import Section from "@/components/Section";
import CurrencyFormat from "@/components/CurrencyFormat";
import Button from "@/components/Button";
import { addRoundFromApi } from "../../services/addRoundFromApi";
import ProductSeller from "@/modules/Orders/components/ProductSeller";
import Card from "@/components/Card";
import { IProductSellerSubmitData } from "@/modules/Orders/components/ProductSeller/types";
import { getRoundProductBodiesFromOrderProductsDic } from "../../utils/getRoundProductBodiesFromOrderProductsDic";
import { getOrderStatus } from "../../utils/getOrderStatus";
import { markPaidOrderFromApi } from "../../services/markPaidOrderFromApi";
import Input from "@/components/Input";
import Form from "@/components/Form";
import { updateOrderFromApi } from "../../services/updateOrderFromApi";
import { getSubtotalFromOrderReport } from "../../utils/getSubtotalFromOrderReport";

const productsHeaders: ITableHeader[] = [
  { text: 'Product', value: 'productName' },
  { text: 'Quantity', value: 'quantity' },
  { text: 'Unit Price', value: 'unitPrice' },
  { text: 'Price', value: 'price' },
];

export default function OrderManager(props: Readonly<IOrderManagerProps>) {
  const { id } = props

  const [order, setOrder] = useState<IOrderReport>({
    id: 0,
    created: '',
    discounts: 0,
    paid: false,
    products: {},
    rounds: [],
    subtotal: 0,
    taxes: 0
  });

  const [discounts, setDiscounts] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingRound, setIsAddingRound] = useState<boolean>(false);
  const [isNewRoundActive, setIsNewRoundActive] = useState<boolean>(false);
  const [isMarkingPaid, setIsMarkingPaid] = useState<boolean>(false);
  const [isUpdatingDiscounts, setIsUpdatingDiscounts] = useState(false);

  const subtotal = useMemo(() => getSubtotalFromOrderReport(order), [order])
  const total = useMemo(() => subtotal - order.discounts, [subtotal, order.discounts])

  useEffect(() => {
    getOrder()
  }, [])

  async function getOrder() {
    const apiResponse = await getOrderFromApi({ id })
    setIsLoading(false)

    if (!apiResponse.isOk) {
      return
    }

    setOrder(apiResponse.response)
  }

  function formatProducts(reportProducts: IOrderReportProduct[]): IOrderReportFormattedProduct[] {
    const productsDictionary = reportProducts.reduce((dictionary, reportProduct) => {
      const product = order.products[reportProduct.product_id]

      if (dictionary[product.id]) {
        dictionary[product.id].quantity += reportProduct.quantity
        return dictionary
      }

      dictionary[product.id] = {
        id: reportProduct.product_id,
        quantity: reportProduct.quantity,
        productName: product.name,
        unitPrice: <CurrencyFormat value={product.price} />,
        price: <CurrencyFormat value={reportProduct.quantity * product.price} />,
      }

      return dictionary
    }, {} as Record<string, IOrderReportFormattedProduct>)

    return Object.values(productsDictionary)
  }

  async function onAddNewRound() {
    setIsNewRoundActive(!isNewRoundActive)
  }

  async function onSubmit({ products }: IProductSellerSubmitData) {
    setIsAddingRound(true)

    await addRoundFromApi({
      body: { order_id: order.id },
      roundProducts: getRoundProductBodiesFromOrderProductsDic(products),
    })

    setIsAddingRound(true)
    setIsNewRoundActive(false)
    await getOrder()
  }

  async function onMarkPaid() {
    setIsMarkingPaid(true)
    await markPaidOrderFromApi({ id: order.id })
    setIsMarkingPaid(false)
    getOrder()
  }

  async function onUpdateDiscounts() {
    setIsUpdatingDiscounts(true)

    await updateOrderFromApi({
      id: order.id,
      body: { discounts },
    })

    setIsUpdatingDiscounts(false)
    getOrder()
  }

  return isLoading
    ? <Loader />
    : (
      <>
        <Section>
          <div>Status: {getOrderStatus(order)}</div>
          <div>Total: <CurrencyFormat value={total} /></div>
        </Section>

        <Section>
          <div className="text-sm">
            <div>Subtotal: <CurrencyFormat value={subtotal} /></div>
            <div>Discounts: <CurrencyFormat value={-order.discounts} /></div>
          </div>
        </Section>

        {!order.paid && (
          <Section>
            <Form
              onSubmit={onUpdateDiscounts}
              className="flex items-end gap-4 max-w-3xl"
            >
              <Input
                className="grow"
                type="number"
                min={0}
                value={discounts}
                name="order-discounts"
                label="Update Discounts"
                onChange={setDiscounts}
              />

              <Button disabled={isUpdatingDiscounts}>Update Discounts</Button>
            </Form>
          </Section>
        )}

        {order.rounds.map(({ id, created, round_products }, index) => round_products.length > 0 && (
          <div key={id}>
            <span className="text-xs">
              Round {index + 1}: <DateFormat value={created} />
            </span>

            <Section >
              <Table headers={productsHeaders} rows={formatProducts(round_products)} />
            </Section>
          </div>
        ))}

        {isNewRoundActive && (
          <Section>
            <Card>
              <Section>New Round</Section>

              <ProductSeller
                onSubmit={onSubmit}
                submitButtonText="Add a new Round"
                isLoading={isAddingRound}
              />
            </Card>
          </Section>
        )}

        <Section className="flex flex-wrap gap-4">
          {!order.paid && (
            <>
              <Button
                onClick={onMarkPaid}
                isLoading={isMarkingPaid}
              >
                Mark as Paid
              </Button>
              <Button onClick={onAddNewRound}>
                {isNewRoundActive ? 'Hide New Round' : 'Add New Round'}
              </Button>
            </>
          )}

        </Section>

      </>
    )
};
