import { useRef, useState } from "react";
import { addOrderFromApi } from "../../services/addOrderFromApi";
import ProductSeller from "@/modules/Products/components/ProductSeller";
import Card from "@/components/Card";
import Section from "@/components/Section";
import { IProductSellerRef, IProductSellerSubmitData } from "@/modules/Products/components/ProductSeller/types";
import { getRoundProductBodiesFromOrderProductsDic } from "../../utils/getRoundProductBodiesFromOrderProductsDic";


export default function OrderAggregator() {
  const productSellerRef = useRef<IProductSellerRef>(null)

  const [isAdding, setIsAdding] = useState(false);

  async function onSubmit({
    discounts,
    products,
  }: IProductSellerSubmitData) {
    if (isAdding) return

    setIsAdding(true)

    const addResponse = await addOrderFromApi({
      body: { discounts },
      roundProducts: getRoundProductBodiesFromOrderProductsDic(products)
    })

    setIsAdding(false)

    if (!addResponse.isOk)
      return

    productSellerRef.current?.cleanForm()
  }

  return (
    <Section>
      <Card>
        <ProductSeller
          ref={productSellerRef}
          submitButtonText="Add a new Order"
          onSubmit={onSubmit}
          isLoading={isAdding}
        />
      </Card>
    </Section>
  )
};
