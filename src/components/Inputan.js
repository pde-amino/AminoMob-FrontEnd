import * as React from "react";
import { Dimensions } from "react-native";
import { TextInput } from "react-native-paper";

const WARNA = { primary: "#0A78E2", white: "#fff" };

const { width, height } = Dimensions.get("window");

const Inputan = ({ label, placeholder }) => (
  <TextInput
    style={{ width: width * 0.85 }}
    mode="outlined"
    selectionColor={WARNA.primary}
    outlineColor={WARNA.primary}
    activeOutlineColor={WARNA.primary}
    placeholderTextColor={"grey"}
    label={label}
    placeholder={placeholder}
  />
);

export default Inputan;
