import fetchMock from "fetch-mock";

export async function waitPromises(quantity: number = 1) {
  for (const i of [...Array(quantity)])
    await fetchMock.flush()
}