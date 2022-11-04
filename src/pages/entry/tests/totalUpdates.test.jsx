import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

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
  render(<Options optionType="toppings" />);

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

describe("grand total", () => {
  test("grand total starts at $0.00", () => {
    render(<OrderEntry />);

    const orderEntry = getByRole("heading", { name: /Grand total: \$/ });
    expect(orderEntry).toHaveTextContent("0.00");
  });
  test("grand total updates properly if a scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotal = getByRole("heading", { name: /Grand total: \$/ });

    // add scoop
    const vanillaScoopInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaScoopInput);
    await user.type("1");
    expect(grandTotal).toHaveTextContent("2.00");

    // add topping
    const cherriesToppingCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesToppingCheckbox);
    expect(grandTotal).toHaveTextContent("3.50");
  });
  test("grand total updates properly if a topping is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    // add topping
    const hotFudgeToppingCheckbox = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    await user.click(hotFudgeToppingCheckbox);

    const grandTotal = getByRole("heading", { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent("1.50");

    // add scoop
    const chocolateScoopInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    await user.clear(chocolateScoopInput);
    await user.type("1");
    expect(grandTotal).toHaveTextContent("2.00");
  });
  test("grand total updates properly if an item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);

    const grandTotal = getByRole("heading", { name: /Grand total: \$/ });

    const vanillaScoopInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaScoopInput);
    await user.type("2");
    // grand total 4.00

    const hotFudgeToppingCheckbox = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    await user.click(hotFudgeToppingCheckbox);
    // grand total 5.50

    await user.clear(vanillaScoopInput);
    await user.type("1");
    // grand total 3.50 (removed 1 vanilla scoop)

    expect(grandTotal).toHaveTextContent("3.50");
  });
});
