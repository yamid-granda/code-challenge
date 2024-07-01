import { describe, it, expect, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OrderAggregator from "..";
import { ADD_ORDER_RESPONSE, ADD_ROUND_PRODUCT_RESPONSE, ADD_ROUND_RESPONSE, PRODUCTS } from "../mocks";
import { GET_PRODUCTS_API_CONFIG } from "@/modules/Products/configs";
import { ADD_ORDER_API_CONFIG, ADD_ROUND_API_CONFIG, ADD_ROUND_PRODUCT_API_CONFIG } from "@/modules/Orders/configs";
import { mockHttpGet, mockHttpPost } from "@/test-utils/mockHttpRequest";
import { waitPromises } from "@/test-utils/waitPromises";
import fetchMock from "fetch-mock";

afterEach(() => {
  fetchMock.reset()
})

describe('OrderAggregator component', () => {
  it('creates a new order with default config', async () => {
    // GIVEN
    mockHttpGet(GET_PRODUCTS_API_CONFIG.url, PRODUCTS)
    const { request: orderRequest } = mockHttpPost(ADD_ORDER_API_CONFIG.url, ADD_ORDER_RESPONSE)
    const { request: roundRequest } = mockHttpPost(ADD_ROUND_API_CONFIG.url, ADD_ROUND_RESPONSE)
    const { request: roundProductRequest } = mockHttpPost(ADD_ROUND_PRODUCT_API_CONFIG.url, ADD_ROUND_PRODUCT_RESPONSE)
    render(<OrderAggregator />)

    // WHEN
    const productSelector = await screen.findByLabelText(/product/i)
    await userEvent.selectOptions(productSelector, 'Orange - $123.00 - stock: 258')
    const addProductButton = await screen.findByRole('button', { name: 'Add' })
    fireEvent.click(addProductButton)

    const createOrderBtn = await screen.findByRole('button', { name: 'Add a new Order' })
    fireEvent.click(createOrderBtn)
    await waitPromises(4)

    // THEN
    expect(orderRequest.body).toEqual({ discounts: 0 })
    expect(roundRequest.body).toEqual({ order_id: ADD_ORDER_RESPONSE.id })
    expect(roundProductRequest.body).toEqual({
      price: 0,
      product_id: 3,
      quantity: 1,
      round_id: 132,
    })
  })

  it('creates a new order with 2 different products', async () => {
    // GIVEN
    mockHttpGet(GET_PRODUCTS_API_CONFIG.url, PRODUCTS)
    const { request: orderRequest } = mockHttpPost(ADD_ORDER_API_CONFIG.url, ADD_ORDER_RESPONSE)
    const { request: roundRequest } = mockHttpPost(ADD_ROUND_API_CONFIG.url, ADD_ROUND_RESPONSE)
    const { request: roundProductRequest } = mockHttpPost(ADD_ROUND_PRODUCT_API_CONFIG.url, ADD_ROUND_PRODUCT_RESPONSE)
    render(<OrderAggregator />)

    // WHEN
    const productSelector = await screen.findByLabelText(/product/i)
    await userEvent.selectOptions(productSelector, 'Orange - $123.00 - stock: 258')
    const addProductButton = await screen.findByRole('button', { name: 'Add' })
    fireEvent.click(addProductButton)

    await userEvent.selectOptions(productSelector, 'Cool - $2.00 - stock: 195')
    fireEvent.click(addProductButton)

    const createOrderBtn = await screen.findByRole('button', { name: 'Add a new Order' })
    fireEvent.click(createOrderBtn)
    await waitPromises(4)

    // THEN
    expect(orderRequest.body).toEqual({ discounts: 0 })
    expect(roundRequest.body).toEqual({ order_id: ADD_ORDER_RESPONSE.id })
    expect(roundProductRequest.body).toEqual([
      {
        price: 0,
        product_id: 3,
        quantity: 1,
        round_id: 132,
      },
      {
        price: 0,
        product_id: 7,
        quantity: 1,
        round_id: 132,
      }
    ])
  })

  it('has initial config', async () => {
    // GIVEN
    render(<OrderAggregator />)
    await waitPromises(1)
    const productSelector = await screen.findByLabelText(/product/i) as HTMLSelectElement
    const quantity = await screen.findByLabelText(/quantity/i) as HTMLInputElement
    const discounts = await screen.findByLabelText(/discounts/i) as HTMLInputElement

    // THEN
    expect(productSelector.value).toBeFalsy()
    expect(quantity.value).toBe('1')
    expect(discounts.value).toBe('0')
  })
})