import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Linking,
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
    <SafeAreaView>
      <Header
        containerStyle={{ width: wp(100), height: hp(8.3) }}
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
    fontSize: hp(2.2),
    fontWeight: "bold",
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
});
