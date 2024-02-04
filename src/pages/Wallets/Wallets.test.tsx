import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import Wallets from "./Wallets";

jest.mock("../../models/WalletKeeper");

describe("Wallets", () => {
  test("renders the list of wallets correctly", async () => {
    renderWithProviders(<Wallets />, {
      preloadedState: {
        user: { password: "test password" },
        wallets: [
          {
            address: "mock address 1",
            name: "test name 1",
            encryptedWallet: "",
          },
          {
            address: "mock address 2",
            name: "test name 2",
            encryptedWallet: "",
          },
        ],
      },
    });

    const wallets = screen.getAllByTestId("wallet");
    const wallet1Address = screen.getByText("mock address 1");
    const wallet2Address = screen.getByText("mock address 2");

    expect(wallet1Address).toBeInTheDocument();
    expect(wallet2Address).toBeInTheDocument();

    await waitFor(() => {
      expect(wallets.length).toBe(2);
    });

    await waitFor(() => {
      const wallet1Text = screen.getByText("test name 1 | Balance: 1000 ETH");
      expect(wallet1Text).toBeInTheDocument();
    });

    await waitFor(() => {
      const wallet2Text = screen.getByText("test name 2 | Balance: 1000 ETH");
      expect(wallet2Text).toBeInTheDocument();
    });
  });
});
