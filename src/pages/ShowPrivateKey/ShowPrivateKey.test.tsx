import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import { useParams } from "react-router-dom";
import ShowPrivateKey from "./ShowPrivateKey";

jest.mock("../../models/WalletKeeper");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

const useParamsMock = useParams as unknown as jest.Mock;

describe("ShowPrivateKey", () => {
  test("shows wallet private key after input password", async () => {
    useParamsMock.mockImplementation(() => ({ address: "mock address" }));
    renderWithProviders(<ShowPrivateKey />, {
      preloadedState: {
        user: { password: "test password" },
        wallets: [
          {
            address: "mock address",
            name: "test name",
            encryptedWallet: "",
          },
        ],
      },
    });

    const input = screen.getByTestId("password");
    const button = screen.getByTestId("showPrivateKey");

    fireEvent.change(input, {
      currentTarget: { name: "name", value: "test password" },
    });

    fireEvent.click(button);

    await waitFor(() => {
      const privateKey = screen.getByTestId("privateKey");
      expect(privateKey).toHaveTextContent("mock private key");
    });
  });
  test("shows wallet not found", () => {
    useParamsMock.mockImplementation(() => ({ address: "mock address" }));
    renderWithProviders(<ShowPrivateKey />, {
      preloadedState: {
        user: { password: "test password" },
        wallets: [
          {
            address: "different mock address",
            name: "test name",
            encryptedWallet: "",
          },
        ],
      },
    });

    expect(screen.getByText("Wallet not found")).toBeInTheDocument();
  });
});
