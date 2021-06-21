import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOptions from "./ScoopOptions";
import Row from "react-bootstrap/Row";
import ToppingOptions from "./ToppingOptions";
import AlertBanner from "../common/AlertBanner";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => setError(true));
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOptions;

  const optionItems = items.map((option) => (
    <ItemComponent
      key={option.name}
      name={option.name}
      imagePath={option.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
};

export default Options;
