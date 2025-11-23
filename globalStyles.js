import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0F2FE", // sky blue
  },
  titleText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E293B", // dark gray
  },
  subtitleText: {
    fontSize: 16,
    color: "#475569", // softer gray
    marginTop: 8,
  },
});
