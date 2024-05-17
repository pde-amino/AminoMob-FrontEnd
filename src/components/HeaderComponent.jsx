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

const WARNA = { primary: "#0A78E2", white: "#fff" };

export default function HeaderComponent({ title, icon, onPress }) {
  return (
    <SafeAreaView>
      <Header
        containerStyle={{ width: "100%", height: 82 }}
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
    fontSize: 20,
    fontWeight: "bold",
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
});
