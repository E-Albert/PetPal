import { View, Text } from "react-native";
import { globalStyles } from "../globalStyles";

/**
 * HomeScreen
 * Simple welcome screen shown in your bottom tab
 */
export default function HomeScreen() {
  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.titleText}>🐾 PetPal</Text>
      <Text style={globalStyles.subtitleText}>Your daily pet care tracker</Text>
    </View>
  );
}
