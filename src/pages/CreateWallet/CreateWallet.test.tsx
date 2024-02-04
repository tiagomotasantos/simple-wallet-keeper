import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import CreateWallet from "./CreateWallet";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../routes";

jest.mock("../../models/WalletKeeper");
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const useDispatchMock = useDispatch as unknown as jest.Mock;
const useNavigateMock = useNavigate as unknown as jest.Mock;

describe("CreateWallet", () => {
  test("renders label, input for name and button", () => {
    renderWithProviders(<CreateWallet />);

    const label = screen.getByText("Wallet name");
    const input = screen.getByTestId("name");
    const button = screen.getByTestId("create");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  test("default wallet name is defined", () => {
    renderWithProviders(<CreateWallet />);

    const input = screen.getByTestId("name");

    expect(input).toHaveValue("Wallet 1");
  });
  test("wallet name is required", () => {
    renderWithProviders(<CreateWallet />);

    const input = screen.getByTestId("name");
    const button = screen.getByTestId("create");

    fireEvent.change(input, {
      target: { name: "name", value: "" },
    });
    fireEvent.click(button);

    expect(screen.getByTestId("create-error")).toBeInTheDocument();
  });
  test("creates a wallet and navigates to the wallets list", async () => {
    const expected = "test wallet name";
    const dispatchMock = jest.fn();
    const navigateMock = jest.fn();

    useDispatchMock.mockImplementation(() => dispatchMock);
    useNavigateMock.mockImplementation(() => navigateMock);
    renderWithProviders(<CreateWallet />);

    const input = screen.getByTestId("name");
    const button = screen.getByTestId("create");

    fireEvent.change(input, {
      currentTarget: { name: "name", value: expected },
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledTimes(1);
    });

    expect(navigateMock).toBeCalledWith(ROUTE.WALLETS);
  });
});
