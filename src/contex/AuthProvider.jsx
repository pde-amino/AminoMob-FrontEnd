import React, { createContext, useState } from "react";

const AuthContex = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState("Mantaaaps");

  return (
    <AuthContex.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContex.Provider>
  );
};

export { AuthContex, AuthProvider };
