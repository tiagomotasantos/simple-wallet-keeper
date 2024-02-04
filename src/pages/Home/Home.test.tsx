import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import Home from "./Home";

describe("Home", () => {
  test("renders create password component when there are no wallets", () => {
    renderWithProviders(<Home />);

    const text = screen.getAllByText("Create password")[0];

    expect(text).toBeInTheDocument();
  });
  test("renders password component when there are wallets", () => {
    renderWithProviders(<Home />, {
      preloadedState: {
        user: null,
        wallets: [
          { name: "test name", address: "test address", encryptedWallet: "" },
        ],
      },
    });

    const text = screen.getByText("Enter password");

    expect(text).toBeInTheDocument();
  });
});
