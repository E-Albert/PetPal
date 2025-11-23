import { View, Text } from "react-native";
import { globalStyles } from "../globalStyles";

/**
 * CalendarScreen
 * Placeholder for pet care schedule / event tracking
 */
export default function CalendarScreen() {
  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.titleText}>📅 Pet Calendar</Text>
      <Text style={globalStyles.subtitleText}>
        Track walks, vet visits, and reminders here
      </Text>
    </View>
  );
}
