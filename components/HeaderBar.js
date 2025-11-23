import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { colors, fontSizes } from "../globalStyles";

export default function HeaderBar({ title, onProfilePress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={onProfilePress}>
        <Image
          source={{
            uri: "https://i.pravatar.cc/100", // placeholder avatar
          }}
          style={styles.profileImage}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: fontSizes.large,
    fontFamily: "Poppins_700Bold",
    color: colors.white,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.white,
  },
});
