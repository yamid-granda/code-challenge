'use client'

import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import ProductsAggregator from "@/modules/Products/components/ProductsAggregator";

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
    </>
  )
};
