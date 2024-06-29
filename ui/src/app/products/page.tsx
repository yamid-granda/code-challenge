'use client'

import Button from "@/components/Button";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import ProductsStock from "@/modules/Products/components/ProductsStock";
import { ADD_PRODUCT_UI_PATH } from "@/modules/Products/configs";

export function ProductsPage() {

  return (
    <>
      <Section>
        <PageTitle>Products</PageTitle>
      </Section>

      <Section>
        <Button href={ADD_PRODUCT_UI_PATH}>Add a new Product</Button>
      </Section>

      <Section>
        <ProductsStock />
      </Section>
    </>
  )
}

export default ProductsPage