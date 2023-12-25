import { createSlice } from "@reduxjs/toolkit";

const ExpensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense(state, { payload }) {
      state.expenses.push(payload);
    },

    removeExpense(state, { payload }) {
      state.expenses.slice(state.expenses.indexOf(payload), 1);
    },
  },
});

export const addExpense = ExpensesSlice.actions.addExpense;
export const removeExpense = ExpensesSlice.actions.removeExpense;

export default ExpensesSlice.reducer;
