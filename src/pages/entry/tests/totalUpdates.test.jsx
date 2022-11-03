import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import Options from "../Options";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  // make sure total starts out at $0.00
  const scoopSubTotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubTotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  // we clear the input to make sure there are no unexpected characters already in there
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopSubTotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopSubTotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />, { wrapper: OrderDetailsProvider });

  // make sure total starts out at $0.00
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  const cherriesCheckboxInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  const hotFudgeCheckboxInput = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });

  await user.click(cherriesCheckboxInput);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  await user.click(hotFudgeCheckboxInput);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  await user.click(cherriesCheckboxInput);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});
