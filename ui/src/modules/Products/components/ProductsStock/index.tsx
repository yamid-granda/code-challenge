import { getProductsFromApi } from '@/modules/Products/services/getProductsFromApi';
import { IProduct } from '@/modules/Products/types';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import Table from '@/components/Table';
import { ITableHeader } from '@/components/Table/types';

const headers: ITableHeader[] = [
  { text: 'Name', value: 'name' },
  { text: 'Price', value: 'price' },
  { text: 'Quantity', value: 'quantity' },
];


export default function ProductsStock() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getProducts() {
    const apiResponse = await getProductsFromApi()
    setIsLoading(false);

    if (!apiResponse.isOk) {
      return;
    }

    setProducts(apiResponse.response);
  }

  useEffect(() => {
    getProducts()
  }, []);

  return isLoading
    ? <Loader />
    : <Table headers={headers} rows={products} />
}
