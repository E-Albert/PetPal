import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReminderContext = createContext();

export function ReminderProvider({ children }) {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const loadReminders = async () => {
      const saved = await AsyncStorage.getItem("reminders");
      if (saved) setReminders(JSON.parse(saved));
    };
    loadReminders();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = (title, date) => {
    const newReminder = { id: Date.now().toString(), title, date };
    setReminders((prev) => [...prev, newReminder]);
  };

  const editReminder = (id, updatedData) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updatedData } : r))
    );
  };

  const deleteReminder = (id) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <ReminderContext.Provider
      value={{ reminders, addReminder, editReminder, deleteReminder }}
    >
      {children}
    </ReminderContext.Provider>
  );
}

export const useReminders = () => useContext(ReminderContext);
