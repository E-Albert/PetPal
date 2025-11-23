import { View, Text } from "react-native";
import { globalStyles } from "../globalStyles";

export default function ProfileScreen() {
  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.titleText}>My Profile</Text>
      <Text style={globalStyles.subtitleText}>Coming soon 🐾</Text>
    </View>
  );
}
