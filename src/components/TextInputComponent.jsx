import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import { TextInput, HelperText } from "react-native-paper";

const WARNA = { primary: "#0A78E2", white: "#fff" };

const { width, height } = Dimensions.get("window");

const TextInputComponent = ({ label, placeholder, jenis, onChangeText }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  // Handle change for username and password based on jenis
  const handleChange = (input) => {
    setText(input);
    if (jenis === "username") {
      const onlyNumbers = /^[0-9]+$/.test(input);
      if (!onlyNumbers) {
        setError("Mohon gunakan angka saja");
      } else {
        setError("");
      }
    } else if (jenis === "password") {
      const containsSpecialChar = /[!@#$%^&*()_=+\-\[\]{};':"\\|,.<>\/?]/.test(
        input
      );
      if (containsSpecialChar) {
        setError("Gak boleh pakai karakter khusus");
      } else {
        setError("");
      }
    }

    // Panggil fungsi onChangeText dari properti
    if (onChangeText) {
      onChangeText(input);
    }
  };

  return (
    <View>
      <TextInput
        style={{ backgroundColor: "white", width: width * 0.85 }}
        mode="flat"
        selectionColor={WARNA.primary}
        outlineColor={WARNA.primary}
        activeOutlineColor={WARNA.primary}
        underlineColor={WARNA.primary}
        activeUnderlineColor={WARNA.primary}
        label={label}
        placeholder={placeholder}
        value={text}
        jenis={jenis}
        onChangeText={handleChange(jenis)}
      />
      {error && (
        <HelperText jenis="error" visible={!!error}>
          {error}
        </HelperText>
      )}
    </View>
  );
};

export default TextInputComponent;
