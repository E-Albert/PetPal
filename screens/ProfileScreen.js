import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import { usePets } from "../context/PetContext";
import { globalStyles, colors } from "../globalStyles";
import { useProfile } from "../context/ProfileContext";


export default function ProfileScreen() {
  const { tasks } = useTasks();
    const { pets } = usePets();
    const { updateProfile } = useProfile();


  const [name, setName] = useState("My PetPal");
  const [photo, setPhoto] = useState("https://i.pravatar.cc/150?img=12");
  const [modalVisible, setModalVisible] = useState(false);
  const [tempName, setTempName] = useState("");
  const [loading, setLoading] = useState(true);

  // Load stored profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedName = await AsyncStorage.getItem("profileName");
        const savedPhoto = await AsyncStorage.getItem("profilePhoto");
        if (savedName) setName(savedName);
        if (savedPhoto) setPhoto(savedPhoto);
      } catch (e) {
        console.log("Error loading profile:", e);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);
    
    useEffect(() => {
      const syncProfile = async () => {
        const savedName = await AsyncStorage.getItem("profileName");
        const savedPhoto = await AsyncStorage.getItem("profilePhoto");
        if (savedName) setName(savedName);
        if (savedPhoto) setPhoto(savedPhoto);
      };
      syncProfile();
    }, [photo]);


  // Pick image from device
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  // Save changes
  const handleSave = async () => {
    try {
      const newName = tempName || name;
      await AsyncStorage.setItem("profileName", newName);
      await AsyncStorage.setItem("profilePhoto", photo);
      setName(newName);
      updateProfile(newName, photo); // 👈 updates global context instantly
      setModalVisible(false);
    } catch (e) {
      console.log("Error saving profile:", e);
    }
  };


  if (loading) {
    return (
      <View style={globalStyles.screenContainer}>
        <Text style={globalStyles.subtitleText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={[globalStyles.screenContainer, { paddingTop: 40 }]}>
      <Image source={{ uri: photo }} style={styles.avatar} />
      <Text style={globalStyles.titleText}>{name} 🐶</Text>
      <Text style={globalStyles.subtitleText}>
        Managing {pets.length} pets and {tasks.length} tasks!
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>🐾 Pet Profiles: {pets.length}</Text>
        <Text style={styles.cardText}>🧾 Active Tasks: {tasks.length}</Text>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => {
          setTempName(name);
          setModalVisible(true);
        }}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Modal for editing */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={globalStyles.titleText}>Edit Profile</Text>

            <TouchableOpacity onPress={pickImage}>
              <Image source={{ uri: photo }} style={styles.modalAvatar} />
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Enter your name..."
              value={tempName}
              onChangeText={setTempName}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    width: "90%",
    marginTop: 20,
    elevation: 3,
    alignItems: "center",
  },
  cardText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: colors.textPrimary,
    marginVertical: 4,
  },
  editButton: {
    marginTop: 24,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  editButtonText: {
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
  modalAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  changePhotoText: {
    marginTop: 6,
    fontFamily: "Poppins_400Regular",
    color: colors.primary,
  },
  input: {
    width: "100%",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontFamily: "Poppins_400Regular",
    marginTop: 12,
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
