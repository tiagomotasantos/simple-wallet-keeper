import { RootState } from "./store";

export const userSelector = (state: RootState) => state.walletKeeper.user;
export const walletsSelector = (state: RootState) => state.walletKeeper.wallets;
export const walletSelector = (addressToFind: string) => (state: RootState) =>
  state.walletKeeper.wallets.find(({ address }) => address === addressToFind);
