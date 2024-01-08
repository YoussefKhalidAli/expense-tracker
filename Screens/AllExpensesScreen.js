// Imported styles
import { GlobalStyles } from "../Constants/styles";

// Data managament
import { setExpenses } from "../Store/ExpensesSlice";
import { getExpenses } from "../util/http";

// Imported tools
import { FlatList, StyleSheet, View } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Imported components
import Expense from "../Component/Expense";
import Overview from "../Component/Overview";

const AllExpensesScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchExpenses() {
      const expenses = await getExpenses();
      dispatch(setExpenses(expenses));
    }
    fetchExpenses();
  }, []);
  const expenses = useSelector((state) => state.expense.expenses);
  const totalCost = useSelector((state) => state.expense.totalCost);

  function renderExpenses({ item }) {
    return (
      <Expense
        key={item.id}
        title={item.title}
        cost={item.cost}
        date={item.date}
        id={item.id}
      />
    );
  }
  return (
    <View style={styles.screen}>
      <Overview message="All expenses" totalCost={totalCost} />
      <FlatList
        data={expenses}
        keyExtractor={(expense) => expense.id}
        renderItem={renderExpenses}
      />
    </View>
  );
};

export default AllExpensesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
