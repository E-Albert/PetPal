import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [name, setName] = useState("My PetPal");
  const [photo, setPhoto] = useState("https://i.pravatar.cc/150?img=12");

  useEffect(() => {
    const loadProfile = async () => {
      const savedName = await AsyncStorage.getItem("profileName");
      const savedPhoto = await AsyncStorage.getItem("profilePhoto");
      if (savedName) setName(savedName);
      if (savedPhoto) setPhoto(savedPhoto);
    };
    loadProfile();
  }, []);

  const updateProfile = async (newName, newPhoto) => {
    if (newName) {
      setName(newName);
      await AsyncStorage.setItem("profileName", newName);
    }
    if (newPhoto) {
      setPhoto(newPhoto);
      await AsyncStorage.setItem("profilePhoto", newPhoto);
    }
  };

  return (
    <ProfileContext.Provider value={{ name, photo, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
