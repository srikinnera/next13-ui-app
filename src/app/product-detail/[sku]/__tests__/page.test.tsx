import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductDetailForm from "../page";
import { GlobalContext } from "@/app/globalContext";

describe("Page for product detail", () => {
  it("should have the form fields", () => {
    render(<ProductDetailForm />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Color")).toBeInTheDocument();
    expect(screen.getByText("Price($)")).toBeInTheDocument();
  });

  it("should prefill form values with product details", () => {
    render(
      <GlobalContext.Provider
        value={{
          product: {
            id: "1234",
            sku: "5678",
            name: "product1",
            type: "pant",
            description: "High waist",
            color: "blue",
            price: 100
          },
          setProduct: () => {},
          selectedColors: [],
          setSelectedColors: () => {},
          setCurrentPage: () => {},
          currentPage: 1
        }}
      >
        <ProductDetailForm />
      </GlobalContext.Provider>
    );
    expect(screen.getByDisplayValue("product1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("pant")).toBeInTheDocument();
    expect(screen.getByDisplayValue("High waist")).toBeInTheDocument();
    expect(screen.getByDisplayValue("blue")).toBeInTheDocument();
    expect(screen.getByDisplayValue("100")).toBeInTheDocument();
  });

  it("should have an update button", () => {
    render(
      <GlobalContext.Provider
        value={{
          product: {
            id: "1234",
            sku: "5678",
            name: "product1",
            type: "pant",
            description: "High waist",
            color: "blue",
            price: 100
          },
          setProduct: () => {},
          selectedColors: [],
          setSelectedColors: () => {},
          setCurrentPage: () => {},
          currentPage: 1
        }}
      >
        <ProductDetailForm />
      </GlobalContext.Provider>
    );
    const btn = screen.getByText("Update");
    expect(btn).toBeInTheDocument();
  });
});
