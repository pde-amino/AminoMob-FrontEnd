import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import { TextInput, HelperText } from "react-native-paper";

const WARNA = { primary: "#0A78E2", white: "#fff" };

const { width, height } = Dimensions.get("window");

const TextInputComponent = ({ label, placeholder, type, onChangeText }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  // Handle change for username and password based on type
  const handleChange = (input) => {
    setText(input);
    if (type === "username") {
      const onlyNumbers = /^[0-9]+$/.test(input);
      if (!onlyNumbers) {
        setError("Mohon gunakan angka saja");
      } else {
        setError("");
      }
    } else if (type === "password") {
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
        onChangeText={handleChange}
      />
      {error && (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      )}
    </View>
  );
};

export default TextInputComponent;
