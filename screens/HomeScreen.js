import { View, Text } from "react-native";
import HeaderBar from "../components/HeaderBar";
import { globalStyles } from "../globalStyles";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <HeaderBar title="PetPal" />
      <View style={globalStyles.screenContainer}>
        <Text style={globalStyles.subtitleText}>
          Your daily pet care tracker 🐾
        </Text>
      </View>
    </View>
  );
}
