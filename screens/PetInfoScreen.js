import { View, Text } from "react-native";
import { globalStyles } from "../globalStyles";

/**
 * PetInfoScreen
 * Displays basic pet information and details (placeholder for now)
 */
export default function PetInfoScreen() {
  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.titleText}>🐶 My Pets</Text>
      <Text style={globalStyles.subtitleText}>
        Add and view your pet profiles here
      </Text>
    </View>
  );
}
