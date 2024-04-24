import * as React from "react";
import { Dimensions, View } from "react-native";
import { TextInput, HelperText } from "react-native-paper";

const WARNA = { primary: "#0A78E2", white: "#fff" };

const { width, height } = Dimensions.get("window");

const Inputan = ({ label, placeholder }) => (
  <View style={{ width: width * 0.9, alignContent: "center" }}>
    <TextInput
      style={{ backgroundColor: "white" }}
      mode="outlined"
      selectionColor={WARNA.primary}
      outlineColor={WARNA.primary}
      activeOutlineColor={WARNA.primary}
      underlineColor={WARNA.primary}
      activeUnderlineColor={WARNA.primary}
      placeholderTextColor={"grey"}
      label={label}
      placeholder={placeholder}
    />
    <HelperText type="error">Email address is invalid!</HelperText>
  </View>
);

export default Inputan;
