import { useState } from "react";
import * as React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

const WARNA = { primary: "#0A78E2", white: "#fff" };

const InputanIconPW = ({ label, placeholder, right, secureTextEntry }) => (
  <TextInput label="Password" secureTextEntry right={right} />
);

export default InputanIconPW;
