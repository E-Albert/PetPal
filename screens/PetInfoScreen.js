import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { usePets } from "../context/PetContext";
import { globalStyles, colors } from "../globalStyles";
import HeaderBar from "../components/HeaderBar";

export default function PetInfoScreen() {
  const { pets, addPet, deletePet } = usePets();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access photos is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddPet = () => {
    if (name.trim() && type.trim()) {
      addPet(name, type, image);
      setName("");
      setType("");
      setImage(null);
      setModalVisible(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderBar title="My Pets" />

      <View style={[globalStyles.screenContainer, { paddingTop: 20 }]}>
        <Text style={globalStyles.titleText}>Your Pets 🐾</Text>

        <FlatList
          data={pets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.petCard}>
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.petImage} />
              )}
              <Text style={styles.petName}>{item.name}</Text>
              <Text style={styles.petType}>{item.type}</Text>
              <TouchableOpacity onPress={() => deletePet(item.id)}>
                <Text style={styles.deleteText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={globalStyles.subtitleText}>No pets added yet!</Text>
          }
          contentContainerStyle={{ paddingVertical: 10 }}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add Pet</Text>
        </TouchableOpacity>
      </View>

      {/* Add Pet Modal */}
      <Modal transparent={true} animationType="fade" visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={globalStyles.titleText}>Add a Pet</Text>

            <TextInput
              style={styles.input}
              placeholder="Pet name..."
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Pet type (dog, cat, etc.)..."
              value={type}
              onChangeText={setType}
            />

            {image && (
              <Image source={{ uri: image }} style={styles.previewImage} />
            )}

            <TouchableOpacity style={styles.photoBtn} onPress={pickImage}>
              <Text style={styles.photoText}>
                {image ? "Change Photo" : "Pick Photo"}
              </Text>
            </TouchableOpacity>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveBtn} onPress={handleAddPet}>
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
  petCard: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 10,
    width: "90%",
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  petName: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: colors.textPrimary,
  },
  petType: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: colors.textSecondary,
    marginVertical: 4,
  },
  deleteText: {
    color: colors.error,
    fontFamily: "Poppins_600SemiBold",
    marginTop: 6,
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
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
  photoBtn: {
    marginTop: 10,
    backgroundColor: "#E2E8F0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  photoText: {
    fontFamily: "Poppins_600SemiBold",
    color: colors.textPrimary,
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
