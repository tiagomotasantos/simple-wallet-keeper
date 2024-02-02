import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User, Wallet } from "../models";

export interface WalletKeeperState {
  wallets: Wallet[];
  user: User | null;
}

const initialState: WalletKeeperState = {
  wallets: [],
  user: null,
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
  },
});

export const { updateUser, createWallet } = walletKeeperSlice.actions;

export default walletKeeperSlice.reducer;
