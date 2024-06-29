import { useEffect, useState } from "react";
import { IOrder, IOrderReport, IOrderReportFormattedProduct, IOrderReportProduct } from "../../types";
import { getOrderFromApi } from "../../services/gerOrderFromApi";
import Loader from "@/components/Loader";
import { IOrderManagerProps } from "./types";
import Table from "@/components/Table";
import { ITableHeader } from "@/components/Table/types";
import DateFormat from "@/components/DateFormat";
import Section from "@/components/Section";
import CurrencyFormat from "@/components/CurrencyFormat";

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

  const [isLoading, setIsLoading] = useState(true);

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

  return isLoading
    ? <Loader />
    : order.rounds.map(({ id, created, round_products }, index) => round_products.length > 0 && (
      <div key={id}>
        <Section >
          Round {index}: <DateFormat value={created} />
          <Table headers={productsHeaders} rows={formatProducts(round_products)} />
        </Section>
      </div>
    ))
};
