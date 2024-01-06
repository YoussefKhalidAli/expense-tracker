// Imported styles
import { GlobalStyles } from "./Constants/styles";

// Store
import { store } from "./Store/Store";

// Imported tools
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

// Imported components
import IconButton from "./Component/IconButton";

// Imported screens
import RecentExpensesScreen from "./Screens/RecentExpensesScreen";
import AllExpensesScreen from "./Screens/AllExpensesScreen";
import ManageExpenseScreen from "./Screens/ManageExpenseScreen";

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
        <Tab.Screen
          name="AllExpenses"
          component={AllExpensesScreen}
          options={{
            tabBarIcon: ({ color }) => {
              return (
                <Ionicons
                  name="calendar-outline"
                  size={32}
                  color={color}
                ></Ionicons>
              );
            },
            tabBarActiveTintColor: GlobalStyles.colors.accent500,
            tabBarInactiveTintColor: GlobalStyles.colors.primary800,
          }}
        />
        <Tab.Screen
          name="RecentExpenses"
          component={RecentExpensesScreen}
          options={{
            tabBarIcon: ({ color }) => {
              return (
                <Ionicons
                  name="hourglass-outline"
                  size={32}
                  color={color}
                ></Ionicons>
              );
            },
            tabBarActiveTintColor: GlobalStyles.colors.accent500,
            tabBarInactiveTintColor: GlobalStyles.colors.primary800,
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <>
      <StatusBar style="light" />
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
              options={({ navigation }) => ({
                headerRight: () => {
                  return (
                    <IconButton
                      icon="add"
                      color="white"
                      onPress={() => {
                        navigation.navigate("ManageExpenses");
                      }}
                    />
                  );
                },
              })}
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
