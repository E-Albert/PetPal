import { TaskProvider } from "./context/TaskContext";
import { PetProvider } from "./context/PetContext";
import MainNavigator from "./navigation/MainNavigator";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { View, Text, ActivityIndicator } from "react-native";
import { colors } from "./globalStyles";

/**
 * App.js
 * Entry point for the PetPal app
 * - Loads fonts
 * - Wraps app with TaskProvider & PetProvider
 */
export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // 🕓 Loading screen while fonts load
  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
        <Text
          style={{
            marginTop: 10,
            color: colors.textSecondary,
            fontFamily: "Poppins_400Regular",
          }}
        >
          Loading fonts...
        </Text>
      </View>
    );
  }

  // ✅ Wrap app in both providers
  return (
    <TaskProvider>
      <PetProvider>
        <MainNavigator />
      </PetProvider>
    </TaskProvider>
  );
}
