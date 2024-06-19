import * as React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { height, width } = Dimensions.get("window");

const ButtonPrimary = ({ title, disabled, onPress }) => (
  <Button
    buttonColor="#0A78E2"
    mode="contained"
    labelStyle={styles.labelStyle}
    style={[styles.buttonStyle, disabled && styles.disabledButton]}
    onPress={onPress}
    disabled={disabled}
  >
    {title}
  </Button>
);

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: hp(1.8),
  },
  buttonStyle: {
    justifyContent: "center",
    borderRadius: 10,
    height: 48,
    marginBottom: 12,
  },
  disabledButton: {
    opacity: 1,
  },
});

export default ButtonPrimary;
