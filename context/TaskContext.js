import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create the task context
const TaskContext = createContext();

/**
 * TaskProvider wraps the app and provides global task state.
 * Handles saving/loading from AsyncStorage.
 */
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // 🧠 Load saved tasks on startup
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const saved = await AsyncStorage.getItem("tasks");
        if (saved) setTasks(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };
    loadTasks();
  }, []);

  // 💾 Save tasks to AsyncStorage whenever they change
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      } catch (error) {
        console.error("Error saving tasks:", error);
      }
    };
    saveTasks();
  }, [tasks]);

  // ➕ Add a new task
  const addTask = (text) => {
    const newTask = { id: Date.now().toString(), text, completed: false };
    setTasks((prev) => [...prev, newTask]);
  };

  // ✅ Toggle task completion
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // ❌ Delete a task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Provide task data + actions to children
  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

// Custom hook for using the Task context
export const useTasks = () => useContext(TaskContext);
