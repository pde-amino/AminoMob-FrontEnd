import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

const WARNA = { primary: "#0A78E2", white: "#fff" };

export default GlobalStyles = StyleSheet.create({
  App: {
    backgroundColor: "#1a4846",
    padding: 20,
  },
  Main: {
    backgroundColor: WARNA.primary,
    // padding: 20,
    justifyContent: "center",
    // alignItems: "center",
    // textAlign: "center",
    padding: 20,
    flex: 1,
    gap: 20,
  },
  Content: {
    color: "#1a4846",
  },
  safeAreaStyle: {
    flex: 1,
    marginTop: 40,
    // Menghindari statusbar android
    padding: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    position: "relative",
  },

  textCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
