import { render, screen, waitFor } from "@testing-library/react";
import UpdateAlert from "../updateAlert";
import "@testing-library/jest-dom";

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
describe("UpdateAlert", () => {
  it("should render the component without errors", () => {
    const { container } = render(
      <UpdateAlert
        status={{ message: "Successfully updated", type: "success" }}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("should show the message", () => {
    render(
      <UpdateAlert
        status={{ message: "Successfully updated", type: "success" }}
      />
    );
    waitFor(() =>
      expect(screen.findByText("Successfully updated")).toBeInTheDocument()
    );
  });
});
