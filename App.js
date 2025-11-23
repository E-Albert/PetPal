import { View, Text } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import "./global.css";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    // Instead of AppLoading, just return null or a simple fallback view
    return (
      <View className="flex-1 items-center justify-center bg-sky-200">
        <Text className="text-lg text-gray-700">Loading fonts...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-sky-200">
      <Text
        style={{ fontFamily: "Poppins_700Bold" }}
        className="text-2xl text-gray-800"
      >
        Hello from PetPal 🐾
      </Text>
    </View>
  );
}
