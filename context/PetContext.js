import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create context
const PetContext = createContext();

/**
 * PetProvider
 * Manages list of pets and stores them in AsyncStorage
 */
export function PetProvider({ children }) {
  const [pets, setPets] = useState([]);

  // Load pets on startup
  useEffect(() => {
    const loadPets = async () => {
      try {
        const saved = await AsyncStorage.getItem("pets");
        if (saved) setPets(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading pets:", error);
      }
    };
    loadPets();
  }, []);

  // Save pets whenever they change
  useEffect(() => {
    const savePets = async () => {
      try {
        await AsyncStorage.setItem("pets", JSON.stringify(pets));
      } catch (error) {
        console.error("Error saving pets:", error);
      }
    };
    savePets();
  }, [pets]);

  // ➕ Add pet
  const addPet = (name, type, image = null) => {
    const newPet = { id: Date.now().toString(), name, type, image };
    setPets((prev) => [...prev, newPet]);
  };


  // ✏️ Edit pet
  const editPet = (id, updatedData) => {
    setPets((prev) =>
      prev.map((pet) => (pet.id === id ? { ...pet, ...updatedData } : pet))
    );
  };

  // ❌ Delete pet
  const deletePet = (id) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
  };

  return (
    <PetContext.Provider value={{ pets, addPet, editPet, deletePet }}>
      {children}
    </PetContext.Provider>
  );
}

// Custom hook for consuming the context
export const usePets = () => useContext(PetContext);
