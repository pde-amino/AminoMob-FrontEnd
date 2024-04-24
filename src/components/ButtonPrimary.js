import * as React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const { height, width } = Dimensions.get("window");

const ButtonPrimary = ({ title, disabled }) => (
  <Button
    buttonColor="#0A78E2"
    mode="contained"
    labelStyle={styles.labelStyle}
    style={[styles.buttonStyle, disabled && styles.disabledButton]}
    onPress={() => console.log("Pressed")}
    disabled={disabled}
  >
    {title}
  </Button>
);

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 16,
  },
  buttonStyle: {
    borderRadius: 10,
    height: 44,
    width: width * 0.9,
  },
  disabledButton: {
    opacity: 1,
  },
});

export default ButtonPrimary;
