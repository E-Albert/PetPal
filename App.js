import { TaskProvider } from "./context/TaskContext";
import { PetProvider } from "./context/PetContext";
import { ReminderProvider } from "./context/ReminderContext";
import { ProfileProvider } from "./context/ProfileContext"; // 👈 add this
import MainNavigator from "./navigation/MainNavigator";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { View, Text, ActivityIndicator } from "react-native";
import { colors } from "./globalStyles";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

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

  return (
    <TaskProvider>
      <PetProvider>
        <ReminderProvider>
          <ProfileProvider>
            <MainNavigator />
          </ProfileProvider>
        </ReminderProvider>
      </PetProvider>
    </TaskProvider>
  );
}
