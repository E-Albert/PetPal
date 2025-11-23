import { TaskProvider } from "./context/TaskContext";
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
 * - Loads custom fonts
 * - Wraps navigation in TaskProvider context
 */
export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // 🕓 Show loading screen while fonts are loading
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

  // ✅ Wrap the app in TaskProvider and load the main navigation
  return (
    <TaskProvider>
      <MainNavigator />
    </TaskProvider>
  );
}
