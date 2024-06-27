import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

const AuthContex = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState("");

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userInfo");
      setAuth(null);
    } catch (error) {
      console.error("Error removing userInfo from AsyncStorage", error);
    }
  };

  return (
    <AuthContex.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContex.Provider>
  );
};

export { AuthContex, AuthProvider };
