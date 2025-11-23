import { View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import "./global.css";

export default function App() {
  return (
    <View className="flex-1">
      <HomeScreen />
    </View>
  );
}
