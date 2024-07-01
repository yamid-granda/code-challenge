'use client'

import Button from "@/components/Button";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import ProductsAggregator from "@/modules/Products/components/ProductsAggregator";
import { PRODUCTS_UI_PATH } from "@/modules/Products/configs";

export default function AddProductPage() {
  return (
    <>
      <Section>
        <PageTitle>Add a new product</PageTitle>
        <p>Fill the following form to add a new product</p>
      </Section>

      <Section>
        <ProductsAggregator />
      </Section>

      <Section>
        <Button href={PRODUCTS_UI_PATH}>Go to Products Inventory</Button>
      </Section>
    </>
  )
};
