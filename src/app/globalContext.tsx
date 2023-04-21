"use client";
import { createContext, useState, useContext } from "react";
import { ProductType, GlobalContextPropsType } from "./types";

const defaultValue = {
  id: "",
  sku: "",
  name: "",
  description: "",
  type: "",
  color: "",
  price: 0
};
export const GlobalContext = createContext<GlobalContextPropsType>({
  product: defaultValue,
  setProduct: () => {}
});

export const GlobalContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [product, setProduct] = useState<ProductType>(defaultValue);
  return (
    <GlobalContext.Provider value={{ product, setProduct }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
