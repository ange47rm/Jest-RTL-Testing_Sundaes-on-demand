import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

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

test("checking the checkbox enables the button and unchecking it disables the button", () => {
  // render the component
  render(<SummaryForm />);

  // find the checkbox and button
  const checkbox = screen.getByRole(
    "checkbox",
    /i agree to Terms and Conditions/i
  );
  const button = screen.getByRole("button", { name: /confirm order/i });

  // tick the checkbox and check that the button is enabled
  fireEvent.click(checkbox);
  expect(button).toBeEnabled();

  // untick the checkbox and check that the button is disabled
  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
});
