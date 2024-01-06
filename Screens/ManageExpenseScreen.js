// Imported styles
import { GlobalStyles } from "../Constants/styles";

// Store
import { addExpense, editExpense, removeExpense } from "../Store/ExpensesSlice";

// Imported tools
import { Button, StyleSheet, TextInput, View, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

// Imported components
import IconButton from "../Component/IconButton";

const ManageExpenseScreen = ({ route }) => {
  const [title, setTitle] = useState(null);
  const [cost, setCost] = useState(null);
  const [date, setDate] = useState(null);
  const [expense, setExpense] = useState(null);
  const [isNew, setIsNew] = useState(true);
  const Errors = useRef([]);

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

  function confirmHandler() {
    const titleIsValid = title === null ? false : title.trim().length > 0;
    const costIsValid = cost === null ? false : !isNaN(cost) && cost > 0;
    const dateIsValid =
      date === null ? false : new Date(date).toString() !== "Invalid Date";
    Errors.current = [];
    if (titleIsValid && costIsValid && dateIsValid) {
      navigation.goBack();
      dispatch(addExpense({ title, cost, date: new Date(date) }));
      return;
    }
    if (!titleIsValid) {
      Errors.current.push("title");
    }
    if (!costIsValid) {
      Errors.current.push("cost");
    }
    if (!dateIsValid) {
      Errors.current.push("date");
    }
    Alert.alert("invalid", "check ur input");
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
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.innerContainer}>
          <TextInput
            style={[
              styles.input,
              Errors.current.includes("cost") && styles.invalid,
            ]}
            keyboardType="numeric"
            onChangeText={(newCost) => setCost(newCost)}
            placeholder="Cost"
          >
            {cost}
          </TextInput>
          <TextInput
            style={[
              styles.input,
              Errors.current.includes("date") && styles.invalid,
            ]}
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
          style={[
            styles.input,
            styles.titleInput,
            Errors.current.includes("title") && styles.invalid,
          ]}
          onChangeText={(newTitle) => setTitle(newTitle)}
          maxLength={20}
          multiline={true}
          textAlignVertical="top"
        >
          {title}
        </TextInput>
      </View>
      <View style={styles.buttons}>
        <View style={[styles.buttons, { opacity: 0.4 }]}>
          <Button title="Cancel" onPress={cancelHandler}></Button>
        </View>
        <View style={styles.buttons}>
          <Button
            onPress={isNew ? confirmHandler : editHandler}
            title={isNew ? "Add" : "Update"}
          ></Button>
        </View>
      </View>
      {!isNew && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            onPress={deleteHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary800,
  },
  inputContainer: {
    flexDirection: "column",
    width: "90%",
    alignItems: "center",
    height: "60%",
  },
  innerContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    width: "100%",
    marginHorizontal: 1,
    paddingHorizontal: 4,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.primary800,
    color: "black",
    fontSize: 24,
    backgroundColor: GlobalStyles.colors.primary100,
    maxWidth: "100%",
  },
  titleInput: {
    maxHeight: "60%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  invalid: {
    borderColor: GlobalStyles.colors.error500,
    color: GlobalStyles.colors.error500,
    backgroundColor: GlobalStyles.colors.error50,
  },
});
