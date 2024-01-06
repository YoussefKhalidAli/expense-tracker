import { configureStore } from "@reduxjs/toolkit";
import ExpensesSlice from "./ExpensesSlice";

export const store = configureStore({
  reducer: { expense: ExpensesSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
