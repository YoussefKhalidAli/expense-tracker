import { createSlice } from "@reduxjs/toolkit";

const ExpensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
    totalCost: 0,
  },
  reducers: {
    setExpenses(state, { payload }) {
      state.expenses = payload.expenses;
      state.totalCost = payload.totalCost;
    },
    addExpense(state, { payload }) {
      state.expenses.push({
        title: payload.title,
        cost: payload.cost,
        date: payload.date,
        id: payload.id,
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
        state.expenses.find(
          (expense) => expense.title === payload.oldExpense.title
        )
      );
      state.expenses[index] = payload.newExpense;
      state.totalCost -= +payload.oldExpense.cost;
      state.totalCost += +payload.newExpense.cost;
    },
  },
});

export const setExpenses = ExpensesSlice.actions.setExpenses;
export const addExpense = ExpensesSlice.actions.addExpense;
export const removeExpense = ExpensesSlice.actions.removeExpense;
export const editExpense = ExpensesSlice.actions.editExpense;

export default ExpensesSlice.reducer;
