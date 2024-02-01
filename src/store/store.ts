import { configureStore } from "@reduxjs/toolkit";
import walletKeeperReducer from "./walletKeeperSlice";

export const store = configureStore({
  reducer: {
    walletKeeper: walletKeeperReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
