import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import Expense from "../Component/Expense";
import { useSelector } from "react-redux";

const currentDate = new Date();
const AllExpensesScreen = () => {
  const expenses = useSelector((state) => state.expense.expenses);

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

  const RecentExpenses = expenses.filter((expense) => {
    return (
      Math.ceil(Math.abs(currentDate - expense.date) / (1000 * 60 * 60 * 24)) <=
      7
    );
  });

  return (
    <View style={styles.screen}>
      <FlatList
        data={RecentExpenses}
        keyExtractor={(expense) => expense.title}
        renderItem={renderExpenses}
        render
      />
    </View>
  );
};

export default AllExpensesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
});
