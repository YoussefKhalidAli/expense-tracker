import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Expense from "../Component/Expense";
import { useSelector } from "react-redux";

const AllExpensesScreen = () => {
  const expenses = useSelector((state) => state.expense.expenses);

  function renderExpenses({ item }) {
    return <Expense key={item.title} title={item.title} cost={item.cost} />;
  }
  return (
    <View style={styles.screen}>
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
    marginTop: 30,
  },
});
