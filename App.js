import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import AllExpensesScreen from "./Screens/AllExpensesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecentExpensesScreen from "./Screens/RecentExpensesScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IconButton from "./Component/IconButton";
import ManageExpenseScreen from "./Screens/ManageExpenseScreen";
import { Provider } from "react-redux";
import { store } from "./Store/Store";
import { GlobalStyles } from "./Constants/styles";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  function TabNavigation() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        }}
      >
        <Tab.Screen name="AllExpenses" component={AllExpensesScreen} />
        <Tab.Screen name="RecentExpenses" component={RecentExpensesScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              contentStyle: {
                backgroundColor: GlobalStyles.colors.primary700,
              },
            }}
          >
            <Stack.Screen
              name="TabsOverview"
              component={TabNavigation}
              options={{
                headerRight: () => {
                  return <IconButton icon="add" color="white" />;
                },
              }}
            />
            <Stack.Screen
              name="ManageExpenses"
              component={ManageExpenseScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({});
