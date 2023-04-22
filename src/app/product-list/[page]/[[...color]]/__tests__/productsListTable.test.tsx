import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductsListTable from "../productsListTable";
import { response, colors } from "../fixtures";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    };
  }
}));
describe("products list table", () => {
  it("should render the products list table correctly", () => {
    render(<ProductsListTable response={response} colors={colors} />);
    waitFor(() => expect(screen.getByText("Name")).toBeInTheDocument());
    waitFor(() => expect(screen.getByText("Type")).toBeInTheDocument());
    waitFor(() => expect(screen.getByText("Color")).toBeInTheDocument());
    waitFor(() => expect(screen.getByText("Price")).toBeInTheDocument());
    waitFor(() =>
      expect(screen.getByText("Edit & Delete")).toBeInTheDocument()
    );
    waitFor(() =>
      expect(screen.getByText("Lennox - Black Shadow")).toBeInTheDocument()
    );
    waitFor(() => expect(screen.getByText("black")).toBeInTheDocument());
    waitFor(() => expect(screen.getByText("pant")).toBeInTheDocument());
    waitFor(() => expect(screen.getByText("$80")).toBeInTheDocument());
  });
});
