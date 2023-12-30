import { Button, StyleSheet, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addExpense, editExpense, removeExpense } from "../Store/ExpensesSlice";

const ManageExpenseScreen = ({ route }) => {
  const [title, setTitle] = useState();
  const [cost, setCost] = useState();
  const [date, setDate] = useState(null);
  const [expense, setExpense] = useState(null);
  const [isNew, setIsNew] = useState(true);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  function cancelHandler() {
    navigation.goBack();
  }

  function deleteHandler() {
    navigation.goBack();
    dispatch(removeExpense(expense));
  }

  function editHandler() {
    navigation.goBack();
    dispatch(
      editExpense({ oldExpense: expense, newExpense: { title, cost, date } })
    );
  }

  function addExpenseHandler() {
    navigation.goBack();
    dispatch(addExpense({ title, cost, date }));
  }

  useEffect(() => {
    if (route.params) {
      setIsNew(false);
      setExpense({
        title: route.params.title,
        cost: route.params.cost,
        date: route.params.date,
      });
      setTitle(route.params.title);
      setCost(route.params.cost);
      setDate(route.params.date);
    }
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.innerContainer}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(newCost) => setCost(newCost)}
              placeholder="Cost"
            >
              {cost}
            </TextInput>
            <TextInput
              style={styles.input}
              onChangeText={(date) => setDate(date)}
              placeholder="YYYY-MM-DD"
              maxLength={10}
            >
              {expense
                ? `${
                    date.getMonth() === 0
                      ? date.getFullYear() - 1
                      : date.getFullYear()
                  }-${
                    date.getMonth() === 0 ? "12" : date.getMonth()
                  }-${date.getDate()}`
                : null}
            </TextInput>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={(newTitle) => setTitle(newTitle)}
            placeholder="Title"
          >
            {title}
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
    flexDirection: "column",
    width: "80%",
    height: "60%",
  },
  innerContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
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
