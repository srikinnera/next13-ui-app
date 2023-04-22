import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DeleteConfirmationModal from "../deleteConfirmationModal";
import { response } from "../fixtures";

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
describe("deleteConfirmationModal", () => {
  it("should render the confirmation modal", () => {
    const product = response.products[0];
    render(
      <DeleteConfirmationModal
        open
        product={product}
        handleSetOpenDeleteConfirmation={jest.fn()}
      />
    );
    expect(
      screen.getByText(
        `Are you sure you want to delete ${product.name} - ${product.sku} product listing`
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });
});
