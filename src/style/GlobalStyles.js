import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

export default GlobalStyles = StyleSheet.create({
  App: {
    backgroundColor: "#1a4846",
    padding: 20,
  },
  Main: {
    backgroundColor: "#e6dfcf",
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
    // Menghindari statusbar android
    padding: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  textCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
