import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontSizes } from "../globalStyles";

/**
 * TaskCard Component
 * Displays an individual task with toggle and delete actions
 */
export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <View style={[styles.card, task.completed && styles.completed]}>
      <Text
        style={[
          styles.text,
          { textDecorationLine: task.completed ? "line-through" : "none" },
        ]}
      >
        {task.text}
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onToggle(task.id)}>
          <Ionicons
            name={task.completed ? "refresh-circle" : "checkmark-circle"}
            size={26}
            color={task.completed ? colors.success : colors.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDelete(task.id)}>
          <Ionicons name="trash" size={24} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    width: "95%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  completed: {
    backgroundColor: "#DCFCE7",
  },
  text: {
    fontSize: fontSizes.medium,
    color: colors.textPrimary,
    fontFamily: "Poppins_400Regular",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
    gap: 16,
  },
});
