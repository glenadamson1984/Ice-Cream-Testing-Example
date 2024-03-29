import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("handles errors for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
      return res(ctx.status(500));
    }),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  // this will debug the dom at any point in the test
  // screen.debug()

  // passing a mock function - a jest mock as its expected as a prop
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  //get by - cause its there on initial render
  //query by - not to be there right away - think of useeffect
  // find by cause its asynchronous
  // waitfor special case cause im waiting on more than one asynchronous result
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});
