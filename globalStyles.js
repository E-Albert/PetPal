import { StyleSheet } from "react-native";

// 🎨 Global color palette
export const colors = {
  primary: "#7DC9FF", // sky blue (brand)
  secondary: "#F8BBD0", // soft pink accent
  background: "#F5FAFF", // very light blue background
  textPrimary: "#1E293B", // dark gray-blue
  textSecondary: "#475569",
  white: "#FFFFFF",
  success: "#4ADE80",
  warning: "#FACC15",
  error: "#F87171",
};

// 🖋️ Font sizes (adjust as needed)
export const fontSizes = {
  small: 14,
  medium: 16,
  large: 20,
  xlarge: 28,
};

// 💅 Global reusable styles
export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
  titleText: {
    fontSize: fontSizes.xlarge,
    fontFamily: "Poppins_700Bold",
    color: colors.textPrimary,
  },
  subtitleText: {
    fontSize: fontSizes.medium,
    fontFamily: "Poppins_400Regular",
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: "center",
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 16,
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSizes.medium,
    fontFamily: "Poppins_600SemiBold",
  },
});
