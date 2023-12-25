import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Expense from "../Component/Expense";
import { useSelector } from "react-redux";

const AllExpensesScreen = () => {
  const expenses = useSelector((state) => state.expense.expenses);
  return (
    <View style={styles.screen}>
      {expenses.map((expense) => {
        return (
          <Expense
            key={expense.title}
            title={expense.title}
            cost={expense.cost}
          />
        );
      })}
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
