import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Header, Icon } from "@rneui/themed";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const WARNA = { primary: "#0A78E2", white: "#fff" };

export default function HeaderComponent({ title, icon, onPress }) {
  const HEADER_HEIGHT =
    Platform.OS === "android" ? hp(8) + StatusBar.currentHeight : hp(9);

  return (
    <SafeAreaView>
      <Header
        containerStyle={{
          width: wp(100),
          height: HEADER_HEIGHT, // Adjust based on platform
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          marginBottom: hp(12),
        }}
        backgroundColor={WARNA.primary}
        leftComponent={
          <TouchableOpacity onPress={onPress}>
            <Icon name={icon} color="white" />
          </TouchableOpacity>
        }
        centerComponent={{ text: title, style: styles.heading }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "white",
    fontSize: hp(2),
    fontWeight: "bold",
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
});
