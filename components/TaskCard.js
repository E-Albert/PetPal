import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors, fontSizes } from "../globalStyles";

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
          <Text style={styles.actionText}>
            {task.completed ? "Undo" : "Done"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id)}>
          <Text style={[styles.actionText, { color: colors.error }]}>
            Delete
          </Text>
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
    width: "90%",
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
    justifyContent: "space-between",
    marginTop: 8,
  },
  actionText: {
    color: colors.primary,
    fontFamily: "Poppins_600SemiBold",
  },
});
