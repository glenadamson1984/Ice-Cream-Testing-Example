import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

test("displays an image from each scoop option from the server", async () => {
  render(<Options optionType="scoops" />);

  //find the images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  //confirm on the alt text of the images
  const altText = scoopImages.map((image) => image.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays an image from each topping option from the server", async () => {
  render(<Options optionType="toppings" />);

  //find the images
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });

  //confirm on the alt text of the images
  const altText = toppingImages.map((image) => image.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
