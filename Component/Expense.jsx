import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../Constants/styles";
import { useNavigation } from "@react-navigation/native";

const Expense = ({ title, cost, date }) => {
  const navigation = useNavigation();

  function pressHandller() {
    navigation.navigate("ManageExpenses", { title, cost });
  }
  return (
    <Pressable style={styles.container} onPress={pressHandller}>
      <View>
        <Text style={styles.text}>{title}</Text>

        <Text style={styles.date}>
          {date.getDate()}--{date.getMonth() === 0 ? "12" : date.getMonth()}--{" "}
          {date.getMonth() === 0 ? date.getFullYear() - 1 : date.getFullYear()}
        </Text>
      </View>
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
    fontSize: 18,
  },
  date: {
    fontSize: 10,
    color: "#dfdede",
  },
});
