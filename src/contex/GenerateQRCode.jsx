import React from "react";
import { View, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

const GenerateQRCode = ({ size, value }) => {
  return (
    <View style={styles.container}>
      <QRCode value={value} size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "pink",
  },
});

export default GenerateQRCode;
