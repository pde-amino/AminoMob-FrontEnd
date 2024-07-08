import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
    // alignContent: "center",
    justifyContent: "center",
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
    width: wp(90),
    height: 48,
    marginHorizontal: 20,
  },
  safeAreaStyle: {
    flex: 1,
    padding: Platform.OS === "android" ? StatusBar.currentHeight : 0, // Menghindari statusbar android
  },
  headerHomeContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    // marginBottom: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    width: wp(90),
    // backgroundColor: "red",
  },
  chipSuccess: {
    borderRadius: 30,
    backgroundColor: "#97E7A4",
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
  },
  chipError: {
    borderRadius: 30,
    backgroundColor: "#FFC5C5",
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
  },
  containerLogo: {
    height: hp(7),
    width: wp(20),
    // backgroundColor: "pink",
  },

  //TEXT
  h1: {
    fontSize: hp(2.8),
    fontWeight: "bold",
    color: "#3E3E3E",
  },
  h2: {
    fontSize: hp(2.2),
    fontWeight: "bold",
    color: "#3E3E3E",
  },
  h3: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#3E3E3E",
  },
  h4: {
    fontSize: hp(1.8),
    fontWeight: "bold",
    color: "#3E3E3E",
  },
  textButtonSmall: {
    color: WARNA.white,
    fontSize: hp(1.8),
    fontWeight: "bold",
  },
  textBiasa: {
    fontSize: hp(1.6),
    color: "#3E3E3E",
  },
  textLink: {
    fontSize: hp(1.6),
    color: WARNA.primary,
    textDecorationLine: "underline",
  },
  textWajib: {
    color: WARNA.red,
    fontSize: 12,
  },
  textChipSucces: {
    color: "#077404",
    fontWeight: "bold",
  },
  textChipError: {
    color: "#CA0101",
    fontWeight: "bold",
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
