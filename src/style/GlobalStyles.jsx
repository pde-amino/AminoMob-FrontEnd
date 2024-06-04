import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

const WARNA = { primary: "#0A78E2", white: "#fff", red: "#F01F1F" };

export default GlobalStyles = StyleSheet.create({
  //CONTAINER
  utama: {
    flex: 1,
    backgroundColor: WARNA.white,
  },
  Home: {
    backgroundColor: WARNA.white,
    justifyContent: "center",
    padding: 20,
    flex: 1,
  },
  Content: {
    flex: 1,
    alignContent: "center",
    // justifyContent: "center",
    // backgroundColor: "#e6dfcf",
    alignItems: "center",
    // color: "#1a4846",
    gap: 8,
    marginTop: 10,
    // width:
    //   Platform.OS === "ios"
    //     ? "100%" // iOS
    //     : "100%", // Android
  },
  btnContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  btnFullContainer: {
    width: "90%",
    height: 48,
  },
  safeAreaStyle: {
    flex: 1,
    padding: Platform.OS === "android" ? StatusBar.currentHeight : 0, // Menghindari statusbar android
  },
  headerHomeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginHorizontal: 10,
  },

  //TEXT
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    // color: "#3E3E3E",
  },
  h2: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3E3E3E",
  },
  h3: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3E3E3E",
  },
  h4: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3E3E3E",
  },
  textButtonSmall: {
    color: WARNA.white,
    fontSize: 14,
    fontWeight: "bold",
  },
  textBiasa: {
    fontSize: 14,
    color: "#3E3E3E",
  },
  textLink: {
    fontSize: 14,
    color: WARNA.primary,
    textDecorationLine: "underline",
  },
  textWajib: {
    color: WARNA.red,
    fontSize: 12,
  },

  //CEKBOX
  cekBox: {
    flexDirection: "row-reverse",
  },

  //BUTTON
  btnRedSmall: {
    backgroundColor: "#DF1448",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },

  subTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#3E3E3E",
  },
});
