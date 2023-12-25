import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { GlobalStyles } from "../Constants/styles";

const Expense = ({ title, cost }) => {
  return (
    <Pressable style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.text}>{cost}</Text>
    </Pressable>
  );
};

export default Expense;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary400,
    width: "80%",
    height: 60,
    marginBottom: 15,
    borderRadius: 8,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});
