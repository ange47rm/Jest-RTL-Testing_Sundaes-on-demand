import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

// (1) The purpose of this CONTEXT is to store order details (no of scoops/toopings and what kind)
const OrderDetails = createContext();

// (2) CUSTOM HOOK to check if we're inside a provider, if not > error, if yes > return context value
export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  // if contextValue is falsy, it means we're not in a provider
  if (!contextValue) {
    throw new Error(
      "useOrderDetails must be called from within an OrderDetailsProvider"
    );
  }
  return contextValue;
}

// (3) PROVIDER
export function OrderDetailsProvider(props) {
  // We define state to keep track of which scoops/toppings we have and how many
  const [optionCounts, setOptionCounts] = useState({
    scoops: {}, // example { Chocolate: 1, Vanilla: 2 }
    toppings: {}, // example { "Gummi Bears": 1 }
  });

  // the below function makes updating the state easier, as you'll be able to call it and pass the parameters,
  // without needing to remember the structure of the optionCounts object
  function updateItemCount(itemName, newItemCount, optionType) {
    // make a copy of existing state
    const newOptionCounts = { ...optionCounts };

    // update the copy with the new information
    newOptionCounts[optionType][itemName] = newItemCount;

    // update the state with the updated copy
    setOptionCounts(newOptionCounts);
  }

  function resetOrder() {
    setOptionCounts({ scoops: {}, toppings: {} });
  }

  // utility function to derive totals from optionCouns state value
  function calculateTotal(optionType) {
    // get an array of counts for the optionType (for example [1, 2])
    const countsArray = Object.values(optionType);

    // total the values in the array of counts (start from 0, loop over values and add to total)
    const totalCount = countsArray.reduce((total, value) => total + value, 0);
    // multiply the total number of items by the price for this optionType
    return totalCount * pricePerItem[optionType];
  }

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  // If useOrderDetails hook is used, from within a provider, they will get an object that'll have optionCounts, their totals and other setters
  const value = { optionCounts, totals, updateItemCount, resetOrder };
  return <OrderDetails.Provider value={value} {...props} />;
}
