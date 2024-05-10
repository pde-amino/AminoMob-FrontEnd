import * as React from "react";
import { PaperProvider } from "react-native-paper";
import { AuthProvider } from "./src/contex/AuthProvider";
import Routes from "./src/routes/Routes";

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </PaperProvider>
  );
}
