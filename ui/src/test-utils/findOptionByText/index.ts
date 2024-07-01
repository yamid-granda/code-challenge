import { screen } from "@testing-library/react";

export async function findOptionByText(name: string): Promise<HTMLOptionElement> {
  return screen.findByRole('option', { name })
}