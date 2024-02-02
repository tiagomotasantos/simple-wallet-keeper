import { RootState } from "./store";

export const userSelector = (state: RootState) => state.user;
export const walletsSelector = (state: RootState) => state.wallets;
export const walletSelector = (addressToFind: string) => (state: RootState) =>
  state.wallets.find(({ address }) => address === addressToFind);
