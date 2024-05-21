import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

const WARNA = { primary: "#0A78E2", white: "#fff", red: "#F01F1F" };

export default GlobalStyles = StyleSheet.create({
  utama: {
    flex: 1,
    // backgroundColor: "pink",
  },
  Home: {
    backgroundColor: WARNA.white,
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
  bannerKuning: {
    backgroundColor: "yellow",
    borderRadius: 20,
  },
  h1: {
    fontSize: 24,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 20,
    fontWeight: "bold",
  },
  h3: {
    fontSize: 18,
    fontWeight: "bold",
  },
  h4: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
