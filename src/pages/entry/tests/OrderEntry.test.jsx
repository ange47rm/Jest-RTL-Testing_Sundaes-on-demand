import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("handles error for scoops and toppings routes", async () => {
  // Server handlers can be overridden
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  // The error are going to appear asynchronously, after the promise is rejected (Options.jsx - Line 15)
  // Older/Slower PCs may render alerts more slowly than faster PCs, which means the expect assertion below will fail
  // as it'll find one alert, instead of two, as the second one has not yet been rendered.
  // To ensure that all elements are rendered before making the assertion, we can use waitFor
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});
