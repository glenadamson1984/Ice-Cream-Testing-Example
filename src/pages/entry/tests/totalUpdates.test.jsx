import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType={"scoops"} />);

  // make sure total starts out at 0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  //update vanilla scoop to 1 and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  render(<Options optionType="toppings" />);

  // make sure total starts out at 0.00
  const toppingsSubTotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubTotal).toHaveTextContent("0.00");

  // update cherries topping by checking the checkbox
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: /Cherries/i,
  });
  userEvent.click(cherriesCheckbox);

  // confirm the subtotal calculates the correct subtotal
  expect(toppingsSubTotal).toHaveTextContent("1.50");

  // update the hot fudge topping by checking the checkbox
  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: /Hot Fudge/i,
  });
  userEvent.click(hotFudgeCheckbox);

  // confirm the subtotal calculates the correct subtotal
  expect(toppingsSubTotal).toHaveTextContent("3.00");

  // uncheck both options and make sure subtotal is reset to zero
  userEvent.click(cherriesCheckbox);
  userEvent.click(hotFudgeCheckbox);

  expect(toppingsSubTotal).toHaveTextContent("0.00");
});

describe("grand total", () => {
  test("grand total starts at $0.00", async () => {
    render(<OrderEntry />);

    const grandTotal = await screen.findByRole("heading", {
      name: /grand total: \$/i,
    });

    expect(grandTotal).toHaveTextContent("0.00");
  });
  test("grand total updates correctly if we add a scoop first", async () => {
    render(<OrderEntry />);

    const grandTotal = await screen.findByRole("heading", {
      name: /grand total: \$/i,
    });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });
    userEvent.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent("3.50");
  });
  test("grand total updates correctly if we add a topping first", async () => {
    render(<OrderEntry />);

    const grandTotal = await screen.findByRole("heading", {
      name: /grand total: \$/i,
    });

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });
    userEvent.click(cherriesCheckbox);

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    expect(grandTotal).toHaveTextContent("3.50");
  });
  test("grand total updates correctly if an item is removed", async () => {
    render(<OrderEntry />);

    const grandTotal = await screen.findByRole("heading", {
      name: /grand total: \$/i,
    });

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });
    userEvent.click(cherriesCheckbox);

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    userEvent.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent("2.00");
  });
});
