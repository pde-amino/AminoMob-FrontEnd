import React, { Component } from "react";
import { Text, View } from "react-native";
import GlobalStyles from "./src/style/GlobalStyles";

export default class Apps extends Component {
  render() {
    return (
      <View style={GlobalStyles.safeAreaStyle}>
        <Text> textInComponent </Text>
      </View>
    );
  }
}
