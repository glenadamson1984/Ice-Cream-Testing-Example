import { useOrderDetails } from "../../contexts/OrderDetails";
import SummaryForm from "./SummaryForm";

const OrderSummary = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();

  const scoopArray = Array.from(orderDetails.scoops.entries());
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingsArray = Array.from(orderDetails.toppings.keys());
  const toppingsList = toppingsArray.map((key) => <li key={key}>{key}</li>);

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {orderDetails.totals.toppings}</h2>
      <ul>{toppingsList}</ul>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};

export default OrderSummary;
