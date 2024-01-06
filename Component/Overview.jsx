// Imported styles
import { GlobalStyles } from "../Constants/styles";

// Imported tools
import { StyleSheet, Text, View } from "react-native";

const Overview = ({ message, totalCost }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.totalCost}>${totalCost}</Text>
    </View>
  );
};

export default Overview;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 38,
    width: 300,
    marginBottom: 16,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 8,
  },
  message: {
    color: GlobalStyles.colors.primary200,
    paddingLeft: 10,
  },
  totalCost: {
    paddingRight: 10,
    color: GlobalStyles.colors.primary500,
    fontSize: 18,
    fontWeight: "bold",
  },
});
