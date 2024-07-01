import { useMemo, useRef, useState } from "react";
import { addOrderFromApi } from "../../services/addOrderFromApi";
import ProductSeller from "@/modules/Orders/components/ProductSeller";
import Card from "@/components/Card";
import Section from "@/components/Section";
import { IProductSellerRef, IProductSellerSubmitData } from "@/modules/Orders/components/ProductSeller/types";
import { getRoundProductBodiesFromOrderProductsDic } from "../../utils/getRoundProductBodiesFromOrderProductsDic";
import FormGrid from "@/components/FormGrid";
import Input from "@/components/Input";
import CurrencyFormat from "@/components/CurrencyFormat";


export default function OrderAggregator() {
  const productSellerRef = useRef<IProductSellerRef>(null)

  const [discounts, setDiscounts] = useState<number>(0);
  const [isAdding, setIsAdding] = useState(false);
  const [subtotal, setSubtotal] = useState<number>(0);

  const total = useMemo<number>(() => subtotal - discounts, [subtotal, discounts])

  async function onSubmit({ products }: IProductSellerSubmitData) {
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
    productSellerRef.current?.productSingleSelectorRef.current?.getProducts()
    setDiscounts(0)
  }

  return (
    <Section>
      <Card>
        <ProductSeller
          ref={productSellerRef}
          submitButtonText="Add a new Order"
          onSubmit={onSubmit}
          isLoading={isAdding}
          onChangeSubtotal={setSubtotal}
          formChildren={(
            <>
              <Section>
                <FormGrid>
                  <Input
                    label="Discounts"
                    name="order-discounts"
                    type="number"
                    min={0}
                    value={discounts}
                    placeholder="0"
                    onChange={value => setDiscounts(value as number)}
                  />
                </FormGrid>
              </Section>

              <Section>
                Total: <CurrencyFormat value={total} />
              </Section>
            </>
          )}
        />
      </Card>
    </Section>
  )
};
