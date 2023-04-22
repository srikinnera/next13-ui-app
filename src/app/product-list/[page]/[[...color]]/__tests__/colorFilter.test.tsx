import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ColorFilter from "../colorFilter";
import { colors } from "../fixtures";

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
describe("ColorFilter", () => {
  it("should render all the colors as checkbox filters", () => {
    render(<ColorFilter colors={colors} productsLength={21} />);
    waitFor(() => expect(screen.getByText("Black")).toBeInTheDocument());
    waitFor(() => expect(screen.getByText("White")).toBeInTheDocument());
    waitFor(() => expect(screen.getByText("Brown")).toBeInTheDocument());
    waitFor(() => expect(screen.getByText("Green")).toBeInTheDocument());
    waitFor(() => expect(screen.getByText("Blue")).toBeInTheDocument());
    waitFor(() => expect(screen.getByText("Pink")).toBeInTheDocument());
  });
});
