import React from "react";
import { View, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

const GenerateQRCode = () => {
  return (
    <View style={styles.container}>
      <QRCode value="https:rajutankoding.com" size={200} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default GenerateQRCode;
