import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { useReminders } from "../context/ReminderContext";
import { globalStyles, colors } from "../globalStyles";
import HeaderBar from "../components/HeaderBar";

export default function CalendarScreen() {
  const { reminders, addReminder, editReminder, deleteReminder } =
    useReminders();
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);

  // 🧠 Save new or edited reminder
  const handleSave = () => {
    if (!title.trim()) return;

    if (editingReminder) {
      editReminder(editingReminder.id, { title, date, time });
    } else {
      addReminder(title, date, time);
    }

    resetForm();
  };

  const handleEdit = (reminder) => {
    setEditingReminder(reminder);
    setTitle(reminder.title);
    setDate(new Date(reminder.date));
    setTime(new Date(reminder.time));
    setModalVisible(true);
  };

  const handleDelete = (id) => deleteReminder(id);

  const resetForm = () => {
    setTitle("");
    setDate(new Date());
    setTime(new Date());
    setEditingReminder(null);
    setModalVisible(false);
  };

  const formattedDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const formattedTime = (t) =>
    new Date(t).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <View style={{ flex: 1 }}>
      <HeaderBar title="Reminders" />

      <View style={[globalStyles.screenContainer, { paddingTop: 20 }]}>
        <Text style={globalStyles.titleText}>Your Pet Reminders 🗓️</Text>

        <FlatList
          data={[...reminders].sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          )}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.reminderText}>{item.title}</Text>
              <Text style={styles.reminderDate}>
                {formattedDate(item.date)} at {formattedTime(item.time)}
              </Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={globalStyles.subtitleText}>No reminders yet!</Text>
          }
          contentContainerStyle={{ paddingVertical: 10 }}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add Reminder</Text>
        </TouchableOpacity>
      </View>

      {/* Add/Edit Reminder Modal */}
      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={globalStyles.titleText}>
              {editingReminder ? "Edit Reminder" : "New Reminder"}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter reminder title..."
              value={title}
              onChangeText={setTitle}
            />

            {/* Date Picker */}
            <TouchableOpacity
              style={styles.dateBtn}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>📅 {formattedDate(date)}</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setDate(selectedDate);
                }}
              />
            )}

            {/* Time Picker */}
            <TouchableOpacity
              style={styles.dateBtn}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.dateText}>⏰ {formattedTime(time)}</Text>
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedTime) => {
                  setShowTimePicker(false);
                  if (selectedTime) setTime(selectedTime);
                }}
              />
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={resetForm}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveText}>
                  {editingReminder ? "Save" : "Add"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 10,
    width: "100%",
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  reminderText: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: colors.textPrimary,
  },
  reminderDate: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: "Poppins_400Regular",
    marginVertical: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 8,
  },
  editText: {
    color: colors.primary,
    fontFamily: "Poppins_600SemiBold",
  },
  deleteText: {
    color: colors.error,
    fontFamily: "Poppins_600SemiBold",
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  addButtonText: {
    color: colors.white,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },
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
  dateBtn: {
    backgroundColor: "#E2E8F0",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    width: "100%",
  },
  dateText: {
    fontFamily: "Poppins_600SemiBold",
    color: colors.textPrimary,
    textAlign: "center",
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
