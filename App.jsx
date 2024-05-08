import * as React from "react";
import Routes from "./src/routes";
import { PaperProvider } from "react-native-paper";
import { AuthProvider } from "./src/contex/AuthProvider";

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </PaperProvider>
  );
}
