import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../globalStyles";

export default function HomeScreen() {
  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.titleText}>🐾 PetPal</Text>
      <Text style={globalStyles.subtitleText}>
        Your daily pet care tracker
      </Text>

      <TouchableOpacity style={globalStyles.button}>
        <Text style={globalStyles.buttonText}>Add New Task</Text>
      </TouchableOpacity>
    </View>
  );
}
