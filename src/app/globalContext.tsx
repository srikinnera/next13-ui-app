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
  setProduct: () => {},
  selectedColors: [],
  setSelectedColors: () => {},
  currentPage: 1,
  setCurrentPage: () => {}
});

export const GlobalContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [product, setProduct] = useState<ProductType>(defaultValue);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  return (
    <GlobalContext.Provider
      value={{
        product,
        setProduct,
        selectedColors,
        setSelectedColors,
        setCurrentPage,
        currentPage
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
