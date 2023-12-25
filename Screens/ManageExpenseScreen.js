import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addExpense } from "../Store/ExpensesSlice";

const ManageExpenseScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [title, setTitle] = useState();
  const [cost, setCost] = useState();

  function cancelHandler() {
    navigation.goBack();
  }

  function addExpenseHandler() {
    navigation.goBack();
    dispatch(addExpense({ title, cost }));
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { width: "70%" }]}
          onChangeText={(newTitle) => setTitle(newTitle)}
        ></TextInput>
        <TextInput
          style={[styles.input, { width: "20%" }]}
          keyboardType="numeric"
          onChangeText={(newCost) => setCost(newCost)}
        ></TextInput>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={cancelHandler}></Button>
        <Button title="Add" onPress={addExpenseHandler}></Button>
      </View>
    </View>
  );
};

export default ManageExpenseScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    width: "80%",
  },
  input: {
    height: 40,
    marginHorizontal: 10,
    borderRadius: 8,
    color: "white",
    fontSize: 24,
    backgroundColor: "#3423cd",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "40%",
    marginTop: 20,
  },
});
