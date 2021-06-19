import { render, screen } from "@testing-library/react";
import App from "../../../App";

test("check that checkbox is not enabled and button is disable on initial load", () => {
  render(<App />);
  const button = screen.getByRole("button", { name: /submit form/i });
  const checkbox = screen.getByRole("checkbox", { name: /enable button/i });

  expect(button).toBeDisabled();
  expect(checkbox).not.toBeChecked();
});
