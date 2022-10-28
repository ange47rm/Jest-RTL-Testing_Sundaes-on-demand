import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../context/OrderDetails";

// The below will return whaterver "render" returns, with the addition of the OrderDetailsProvider as wrapper
const renderWithContext = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithContext as render };

// Now if we want to render with context, we can import from this file, otherwise we can import as usual from RTL
