import axios from "axios";

export async function postExpense(expense) {
  const res = await axios.post(
    "https://react-native-1876f-default-rtdb.firebaseio.com/expenses.json",
    expense
  );
  return res.data.name;
}

export async function getExpenses() {
  const res = await axios.get(
    "https://react-native-1876f-default-rtdb.firebaseio.com/expenses.json"
  );
  let expenses = [];
  let totalCost = 0;
  const data = res.data;
  for (const key in data) {
    totalCost += +data[key].cost;
    const expense = {
      id: key,
      title: data[key].title,
      cost: data[key].cost,
      date: new Date(data[key].date),
    };
    expenses.push(expense);
  }
  return { expenses, totalCost };
}

export async function deleteExpense(id) {
  await axios.delete(
    `https://react-native-1876f-default-rtdb.firebaseio.com/expenses/${id}.json`
  );
}

export async function updateExpense(id, updatedExpense) {
  await axios.put(
    `https://react-native-1876f-default-rtdb.firebaseio.com/expenses/${id}.json`,
    updatedExpense
  );
}
