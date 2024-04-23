import { useState } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

const WARNA = { primary: "#0A78E2", white: "#fff" };

const InputanIconPW = ({ label, placeholder, right, secureTextEntry }) => (
  <TextInput
    style={{ width: 350 }}
    mode="outlined"
    selectionColor={WARNA.primary}
    outlineColor={WARNA.primary}
    activeOutlineColor={WARNA.primary}
    placeholderTextColor={"grey"}
    label={label}
    placeholder={placeholder}
    secureTextEntry={secureTextEntry}
    right={right}
  />
);

const styles = StyleSheet.create({});

export default InputanIconPW;
