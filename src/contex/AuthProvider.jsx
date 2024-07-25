import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";

const AuthContex = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState("");

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userInfo");
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
