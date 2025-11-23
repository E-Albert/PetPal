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

/**
 * PetInfoScreen
 * Manage your pets — view, add, edit, delete, and add photo
 */
export default function PetInfoScreen() {
  const { pets, addPet, deletePet, editPet } = usePets();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null); // track pet for editing

  // 🖼️ Choose or change photo
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

  // ➕ or ✏️ Handle Add/Edit Pet
  const handleSavePet = () => {
    if (!name.trim() || !type.trim()) return;

    if (selectedPet) {
      // Edit existing pet
      editPet(selectedPet.id, { name, type, image });
    } else {
      // Add new pet
      addPet(name, type, image);
    }

    setName("");
    setType("");
    setImage(null);
    setSelectedPet(null);
    setModalVisible(false);
  };

  // ✏️ Start editing a pet
  const handleEditPress = (pet) => {
    setSelectedPet(pet);
    setName(pet.name);
    setType(pet.type);
    setImage(pet.image || null);
    setModalVisible(true);
  };

  // 🧹 Close modal + reset fields
  const handleCloseModal = () => {
    setModalVisible(false);
    setName("");
    setType("");
    setImage(null);
    setSelectedPet(null);
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

              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleEditPress(item)}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deletePet(item.id)}>
                  <Text style={styles.deleteText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={globalStyles.subtitleText}>No pets added yet!</Text>
          }
          contentContainerStyle={{ paddingVertical: 10 }}
        />

        {/* Add Pet Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add Pet</Text>
        </TouchableOpacity>
      </View>

      {/* Add/Edit Pet Modal */}
      <Modal transparent={true} animationType="fade" visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={globalStyles.titleText}>
              {selectedPet ? "Edit Pet" : "Add a Pet"}
            </Text>

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
              <TouchableOpacity style={styles.cancelBtn} onPress={handleCloseModal}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveBtn} onPress={handleSavePet}>
                <Text style={styles.saveText}>
                  {selectedPet ? "Save" : "Add"}
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
  petCard: {
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
