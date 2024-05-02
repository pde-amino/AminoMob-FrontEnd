import * as React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const ButtonSecondary = ({ title, onPress }) => (
  <Button
    // textColor="blue"
    mode="outlined"
    labelStyle={styles.labelStyle}
    style={styles.buttonStyle}
    onPress={onPress}>
    {title}
  </Button>
);

const styles = StyleSheet.create({
  labelStyle: {
    color: "#0A78E2",
    fontSize: 16,
  },
  buttonStyle: {
    borderRadius: 10,
    height: 40,
    borderColor: "#0A78E2",
  },
});

export default ButtonSecondary;
