import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User, Wallet } from "../models";

export interface WalletKeeperState {
  wallets: Wallet[];
  user: User | null;
  loading?: boolean;
}

const initialState: WalletKeeperState = {
  wallets: [],
  user: null,
  loading: false,
};

export const walletKeeperSlice = createSlice({
  name: "walletKeeper",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    createWallet: (state, action: PayloadAction<Wallet>) => {
      state.wallets = [...state.wallets, action.payload];
    },
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { updateUser, createWallet, updateLoading } =
  walletKeeperSlice.actions;

export default walletKeeperSlice.reducer;
