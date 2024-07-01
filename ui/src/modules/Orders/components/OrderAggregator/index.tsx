import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Form from "@/components/Form";
import Input from "@/components/Input";
import { useState } from "react";

export default function OrderCreator() {
  const [isPaid, setIsPaid] = useState<boolean>(false);

  function onChange(value: boolean) {
    setIsPaid(value)
  }

  return (
    <Form
      actions={<Button>Add a new Order</Button>}
    >
      <Input
        label="Discounts"
        name="order-discounts"
        type="number"
        placeholder="0"
      />

      <Checkbox
        value={isPaid}
        label="Is Paid ?"
        name="order-is-paid"
        onChange={onChange}
      />
    </Form>
  )
};
