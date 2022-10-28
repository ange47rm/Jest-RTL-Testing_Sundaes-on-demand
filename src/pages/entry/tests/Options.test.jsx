import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

test("it displays an image for each scoop from the server", async () => {
  render(<Options optionType="scoops" />);

  // find scoop images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("it displays an image for each topping from the server", async () => {
  render(<Options optionType="toppings" />);

  // find topping images
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
