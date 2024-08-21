import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

const AuthContex = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState("");

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userInfo");
      await SecureStore.deleteItemAsync("userData");

      setAuth(null);
    } catch (error) {
      Alert.alert(
        "Maaf",
        "Terjadi kesalahan saat proses logout, mohon ulangi sesaat lagi"
      );
    }
  };

  return (
    <AuthContex.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContex.Provider>
  );
};

export { AuthContex, AuthProvider };
