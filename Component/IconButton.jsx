import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function IconButton({ icon, color }) {
  const navigation = useNavigation();
  const showAddExpenseScreen = () => {
    navigation.navigate("ManageExpenses");
  };
  return (
    <Pressable
      onPress={showAddExpenseScreen}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Ionicons name={icon} size={36} color={color} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
