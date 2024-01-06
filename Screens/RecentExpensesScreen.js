// Imported styles
import { GlobalStyles } from "../Constants/styles";

// Imported tools
import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Imported components
import Expense from "../Component/Expense";
import Overview from "../Component/Overview";

const currentDate = new Date();
const AllExpensesScreen = () => {
  const expenses = useSelector((state) => state.expense.expenses);
  const [totalCost, setTotalCost] = useState();

  useEffect(() => {
    let total = 0;
    RecentExpenses.map((recentExpense) => {
      return (total += +recentExpense.cost);
    });
    setTotalCost(total);
  }, []);

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
      <Overview message="Last 7 days" totalCost={totalCost} />
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
    paddingTop: 30,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
