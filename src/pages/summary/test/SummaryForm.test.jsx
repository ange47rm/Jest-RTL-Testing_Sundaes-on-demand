import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("checkbox is unchecked by default and button is disabled", () => {
  // render the component
  render(<SummaryForm />);

  // find the checkbox and button
  const checkbox = screen.getByRole(
    "checkbox",
    /i agree to Terms and Conditions/i
  );
  const button = screen.getByRole("button", { name: /confirm order/i });

  // expect checkbox to be unchecked and the button to be disabled by default
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test("checking the checkbox enables the button and unchecking it disables the button", async () => {
  // create user instance
  const user = userEvent.setup();

  // render the component
  render(<SummaryForm />);

  // find the checkbox and button
  const checkbox = screen.getByRole(
    "checkbox",
    /i agree to Terms and Conditions/i
  );
  const button = screen.getByRole("button", { name: /confirm order/i });

  // tick the checkbox and check that the button is enabled
  await user.click(checkbox);
  expect(button).toBeEnabled();

  // untick the checkbox and check that the button is disabled
  await user.click(checkbox);
  expect(button).toBeDisabled();
});

test("popover responds to hover", async () => {
  // create user instance
  const user = userEvent.setup();

  // render the component
  render(<SummaryForm />);

  // popover starts out not visible (not on the page - not hidden)
  // we will use QUERY as we expect the element NOT to be in the DOM
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);

  // we will use GET as we expect the element to be in the DOM
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
