import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
} from "react-native";
import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { globalStyles, colors } from "../globalStyles";
import HeaderBar from "../components/HeaderBar";
import TaskCard from "../components/TaskCard";
import AddTaskButton from "../components/AddTaskButton";

/**
 * HomeScreen
 * Displays today's pet tasks with add/delete/toggle functionality.
 */
export default function HomeScreen() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [text, setText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddTask = () => {
    if (text.trim()) {
      addTask(text);
      setText("");
      setModalVisible(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderBar title="Pet Tasks" />

      <View style={[globalStyles.screenContainer, { paddingTop: 20 }]}>
        <Text style={globalStyles.titleText}>Today's Tasks 🐾</Text>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <TaskCard
                task={item}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            </View>
          )}
          ListEmptyComponent={
            <Text style={globalStyles.subtitleText}>No tasks yet!</Text>
          }
          contentContainerStyle={{ alignItems: "center", paddingVertical: 10 }}
        />
      </View>

      {/* Floating Add Button */}
      <AddTaskButton onPress={() => setModalVisible(true)} />

      {/* Modal for adding a new task */}
      <Modal transparent={true} animationType="fade" visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={globalStyles.titleText}>New Task</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter task name..."
              value={text}
              onChangeText={setText}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveBtn} onPress={handleAddTask}>
                <Text style={styles.saveText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.white,
    width: "85%",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontFamily: "Poppins_400Regular",
    marginTop: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 16,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#E2E8F0",
  },
  cancelText: {
    color: colors.textPrimary,
    fontFamily: "Poppins_600SemiBold",
  },
  saveBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  saveText: {
    color: colors.white,
    fontFamily: "Poppins_600SemiBold",
  },
});
