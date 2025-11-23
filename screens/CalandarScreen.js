import { View, Text } from "react-native";
import { globalStyles } from "../globalStyles";

export default function HomeScreen() {
  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.titleText}>🐾 PetPal</Text>
      <Text style={globalStyles.subtitleText}>
        Your daily pet care tracker
      </Text>
    </View>
  );
}
