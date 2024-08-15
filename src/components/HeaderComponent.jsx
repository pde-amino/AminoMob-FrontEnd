import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import React from "react";
import { Header, Icon } from "@rneui/themed";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const WARNA = { primary: "#0A78E2", white: "#fff" };

export default function HeaderComponent({ title, icon, onPress }) {
  return (
    <View>
      <StatusBar barStyle="light-content" translucent="true" />
      <Header
        containerStyle={{
          width: wp(100),
          height: Platform.OS === "android" ? hp(10) : hp(9), // Adjust based on platform
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
    </View>
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
