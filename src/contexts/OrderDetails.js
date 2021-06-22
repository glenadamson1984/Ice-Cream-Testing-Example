import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { pricePerItem } from "../constants";

// this follows the pattern recommended by Kent C Dodds
// https://kentcdodds.com/blog/application-state-management-with-react

const OrderDetails = createContext();

// create custom hook
export const useOrderDetails = () => {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error("useOrderDetails needs to be inside a provider");
  }

  return context;
};

const calculateSubtotal = (optionType, optionCounts) => {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[optionType];
};

export const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionsCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const [totals, setTotals] = useState({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  });

  useEffect(() => {
    const scoopsSubTotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubTotal = calculateSubtotal("toppings", optionCounts);

    const grandTotal = scoopsSubTotal + toppingsSubTotal;

    setTotals({
      scoops: scoopsSubTotal,
      toppings: toppingsSubTotal,
      grandTotal,
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    const updateItemCount = (itemName, newItemCount, optionType) => {
      const newOptionCounts = { ...optionCounts };

      // update option count for this item with the new value
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionsCounts(newOptionCounts);
    };

    // getter: option counts for scoops and topping as well as totals and subtotals
    // setter: option counts for scoops and topping
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
};