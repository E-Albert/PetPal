import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { globalStyles, colors } from "../globalStyles";
import HeaderBar from "../components/HeaderBar";
import TaskCard from "../components/TaskCard";

export default function HomeScreen() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [text, setText] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <HeaderBar title="Pet Tasks" />

      <View style={[globalStyles.screenContainer, { paddingTop: 20 }]}>
        <Text style={globalStyles.titleText}>Today's Tasks 🐾</Text>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskCard task={item} onToggle={toggleTask} onDelete={deleteTask} />
          )}
          ListEmptyComponent={<Text style={globalStyles.subtitleText}>No tasks yet!</Text>}
          contentContainerStyle={{ alignItems: "center", paddingVertical: 10 }}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a new task..."
            value={text}
            onChangeText={setText}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              if (text.trim()) {
                addTask(text);
                setText("");
              }
            }}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontFamily: "Poppins_400Regular",
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 8,
  },
  addButtonText: {
    color: colors.white,
    fontFamily: "Poppins_600SemiBold",
  },
});
