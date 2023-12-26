import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addExpense, editExpense, removeExpense } from "../Store/ExpensesSlice";

const ManageExpenseScreen = ({ route }) => {
  const [title, setTitle] = useState();
  const [cost, setCost] = useState();
  const [expense, setExpense] = useState(null);
  const [isNew, setIsNew] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function cancelHandler() {
    console.log("t:", title);
    console.log("c:", cost);
    navigation.goBack();
  }

  function deleteHandler() {
    navigation.goBack();
    dispatch(removeExpense(expense));
  }

  function editHandler() {
    navigation.goBack();
    dispatch(editExpense({ oldExpense: expense, newExpense: { title, cost } }));
  }

  function addExpenseHandler() {
    navigation.goBack();
    dispatch(addExpense({ title, cost }));
  }

  useEffect(() => {
    if (route.params) {
      setIsNew(false);
      setExpense({ title: route.params.title, cost: route.params.cost });
      setTitle(route.params.title);
      setCost(route.params.cost);
    }
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { width: "70%" }]}
            onChangeText={(newTitle) => setTitle(newTitle)}
          >
            {title}
          </TextInput>
          <TextInput
            style={[styles.input, { width: "20%" }]}
            keyboardType="numeric"
            onChangeText={(newCost) => setCost(newCost)}
          >
            {cost}
          </TextInput>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={isNew ? "Cancel" : "Delete"}
            onPress={isNew ? cancelHandler : deleteHandler}
          ></Button>
          <Button
            title={isNew ? "Add" : "Edit"}
            onPress={isNew ? addExpenseHandler : editHandler}
          ></Button>
        </View>
      </View>
    </>
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
