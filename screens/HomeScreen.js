import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-sky-100">
      <Text className="text-3xl font-bold text-gray-800">🐾 PetPal</Text>
      <Text className="text-gray-700 mt-2">Your daily pet care tracker</Text>
    </View>
  );
}
