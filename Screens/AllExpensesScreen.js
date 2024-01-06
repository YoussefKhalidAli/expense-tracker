// Imported styles
import { GlobalStyles } from "../Constants/styles";

// Imported tools
import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

// Imported components
import Expense from "../Component/Expense";
import Overview from "../Component/Overview";

const AllExpensesScreen = () => {
  const expenses = useSelector((state) => state.expense.expenses);
  const totalCost = useSelector((state) => state.expense.totalCost);

  function renderExpenses({ item }) {
    return (
      <Expense
        key={item.title}
        title={item.title}
        cost={item.cost}
        date={item.date}
      />
    );
  }
  return (
    <View style={styles.screen}>
      <Overview message="All expenses" totalCost={totalCost} />
      <FlatList
        data={expenses}
        keyExtractor={(expense) => expense.title}
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
