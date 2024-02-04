import { configureStore } from "@reduxjs/toolkit";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { AppStore } from "../store";
import walletKeeperReducer, {
  WalletKeeperState,
} from "../store/walletKeeperSlice";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: WalletKeeperState;
  store?: AppStore;
}

const mockDefaultState = {
  user: { password: "test password" },
  wallets: [],
};

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = mockDefaultState,
    store = configureStore({ reducer: walletKeeperReducer, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
