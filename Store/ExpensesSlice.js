import { createSlice } from "@reduxjs/toolkit";

const ExpensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
    totalCost: 0,
  },
  reducers: {
    addExpense(state, { payload }) {
      state.expenses.push({
        title: payload.title,
        cost: payload.cost,
        date: new Date(payload.date),
      });
      state.totalCost += +payload.cost;
    },

    removeExpense(state, { payload }) {
      state.expenses.splice(
        state.expenses.indexOf(
          state.expenses.find((v) => v.title === payload.title)
        ),
        1
      );
      state.totalCost -= payload.cost;
    },

    editExpense(state, { payload }) {
      const index = state.expenses.indexOf(
        state.expenses.find((v) => v.title === payload.oldExpense.title)
      );
      state.expenses[index] = payload.newExpense;
    },
  },
});

export const addExpense = ExpensesSlice.actions.addExpense;
export const removeExpense = ExpensesSlice.actions.removeExpense;
export const editExpense = ExpensesSlice.actions.editExpense;

export default ExpensesSlice.reducer;
