import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";

const OrderConfirmation = ({ setOrderPhase }) => {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:3030/toppings")
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleClick = () => {
    resetOrder();

    setOrderPhase("inProgress");
  };

  if (!orderNumber) {
    return <div>Loading</div>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Thank You</h1>
      <p>Your order number is {orderNumber}</p>
      <p>As per our terms and conditions nothing will happen now</p>
      <Button onClick={handleClick}>Create new order</Button>
    </div>
  );
};

export default OrderConfirmation;
