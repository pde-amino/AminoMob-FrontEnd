import React, { createContext, useState } from "react";

const AuthContex = createContext();

const AuthProvider = ({ children }) => {
  const [data, setData] = useState("Mantaaaps");

  return (
    <AuthContex.Provider value={{ data, setData }}>
      {children}
    </AuthContex.Provider>
  );
};

export { AuthContex, AuthProvider };
