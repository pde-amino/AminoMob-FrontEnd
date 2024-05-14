import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

const WARNA = { primary: "#0A78E2", white: "#fff", red: "#F01F1F" };

export default GlobalStyles = StyleSheet.create({
  App: {
    backgroundColor: "#1a4846",
    padding: 20,
  },
  Main: {
    backgroundColor: WARNA.primary,
    justifyContent: "center",
    flex: 1,
  },
  Home: {
    backgroundColor: "lightblue",
    justifyContent: "center",
    padding: 20,
    flex: 1,
  },
  Content: {
    // flex: 1,
    alignContent: "center",
    justifyContent: "center",
    // backgroundColor: "#e6dfcf",
    alignItems: "center",
    color: "#1a4846",
    gap: 8,
    marginTop: 20,
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
    alignContent: "center",
    textAlign: "center",
    width: "80%",
  },
});
