import React, { useState } from "react";
import { View, Dimensions, TouchableOpacity, Text } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import GlobalStyles from "../style/GlobalStyles";

const WARNA = { primary: "#0A78E2", white: "#fff", red: "#F01F1F" };
const { width } = Dimensions.get("window");

const validateInput = (input, type) => {
  const SpecialChar = /[:;|\\\$%\^&\*\(\)=\+"'\{\}\[\]\/\?\><#]/.test(input);
  const isNumber = /^[0-9]+$/.test(input);

  if (type === "password") {
    return SpecialChar ? "Gak boleh pakai karakter tersebut" : "";
  } else if (type === "nama") {
    return isNumber ? "Mohon masukkan nama anda" : "";
  } else if (type === "nomor") {
    if (!isNumber) {
      return "Mohon masukkan nomor HP yang aktif";
    }
    return input.length < 11 ? "Jumlah nomor HP harus lebih dari 11 digit" : "";
  } else if (type === "ktp") {
    return input.length === 16 ? "" : "Jumlah NIK harus sesuai";
  }
  return "";
};

const TextInputComponentModal = ({
  disable,
  label = "",
  placeholder = "",
  type,
  onChangeText,
  password = false,
  value = "",
  inputMode = "text",
}) => {
  const [text, setText] = useState(value);
  const [error, setError] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(password);

  const handleChange = (input) => {
    setText(input);
    const validationError = validateInput(input, type);
    setError(validationError);
    if (onChangeText) {
      onChangeText(input);
    }
  };

  const toggleSecureTextEntry = () => {
    setSecureTextEntry((prevState) => !prevState);
  };

  return (
    <View>
      <TextInput
        style={{
          backgroundColor: "white",
          fontSize: 14,
        }}
        mode="outlined"
        textColor="black"
        selectionColor={WARNA.primary}
        outlineColor={WARNA.primary}
        outlineStyle={{ borderRadius: 10 }}
        activeOutlineColor={WARNA.primary}
        underlineColor={WARNA.primary}
        activeUnderlineColor={WARNA.primary}
        label={label}
        placeholder={placeholder}
        value={text}
        onChangeText={handleChange}
        secureTextEntry={secureTextEntry}
        inputMode={inputMode}
        disabled={disable}
      />
      {password ? (
        <TouchableOpacity style={{ margin: 5 }} onPress={toggleSecureTextEntry}>
          {secureTextEntry ? (
            <Text style={GlobalStyles.textBiasa}>Lihat Password</Text>
          ) : (
            <Text style={GlobalStyles.textBiasa}>Sembunyikan Password</Text>
          )}
        </TouchableOpacity>
      ) : null}
      {error && (
        <HelperText style={{ color: WARNA.red }} type="error" visible={!!error}>
          {error}
        </HelperText>
      )}
    </View>
  );
};

export default TextInputComponentModal;
