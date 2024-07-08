import React, { useState } from "react";
import { View, Dimensions, TouchableOpacity, Text } from "react-native";
import { TextInput, HelperText } from "react-native-paper";

const WARNA = { primary: "#0A78E2", white: "#fff", red: "#F01F1F" };
const { width } = Dimensions.get("window");

const validateInput = (input, type) => {
  const SpecialChar = /[!@#$%^&*()_=+\-\[\]{};':"\\|,.<>\/?]/.test(input);
  const isNumber = /^[0-9]+$/.test(input);

  if (type === "password") {
    return SpecialChar ? "Gak boleh pakai karakter khusus" : "";
  } else if (type === "nama") {
    return isNumber ? "Mohon masukkan nama anda" : "";
  } else if (type === "nomor") {
    if (!isNumber) {
      return "Mohon masukkan nomor hp yang benar";
    }
    return input.length < 11 ? "Jumlah nomor kurang" : "";
  } else if (type === "ktp") {
    return input.length === 16 ? "" : "Jumlah nomor KTP harus sesuai";
  }
  return "";
};

const TextInputIconComponent = ({
  label = "",
  placeholder = "",
  type,
  onChangeText,
  password = false,
  value = "",
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
          width: width * 0.9,
          fontSize: 14,
        }}
        mode="outlined"
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
        right={
          password ? (
            <TextInput
              icon={secureTextEntry ? "eye-off" : "eye"}
              onPress={toggleSecureTextEntry}
            />
          ) : null
        }
      />
      {password ? (
        <TouchableOpacity style={{ margin: 5 }} onPress={toggleSecureTextEntry}>
          {secureTextEntry ? (
            <Text>Lihat Password</Text>
          ) : (
            <Text>Sembunyikan Password</Text>
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

export default TextInputIconComponent;
