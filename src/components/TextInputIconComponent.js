import { color } from "@rneui/base";
import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import { TextInput, HelperText } from "react-native-paper";

const WARNA = { primary: "#0A78E2", white: "#fff", red: "#F01F1F" };

const { width } = Dimensions.get("window");

const validateInput = (input, type) => {
  // Fungsi untuk memvalidasi input berdasarkan tipe
  if (type === "username") {
    const onlyNumbers = /^[0-9]+$/.test(input);
    return onlyNumbers ? "" : "Mohon gunakan angka saja";
  } else if (type === "password") {
    const containsSpecialChar = /[!@#$%^&*()_=+\-\[\]{};':"\\|,.<>\/?]/.test(
      input
    );
    return containsSpecialChar ? "Gak boleh pakai karakter khusus" : "";
  } else if (type === "nama") {
    const namaCek = /^[0-9]+$/.test(input);
    return namaCek ? "Mohon masukkan nama anda" : "";
  }
  // Tidak ada validasi tambahan
  return "";
};

const TextInputIconComponent = ({
  label,
  placeholder,
  type,
  onChangeText,
  password,
}) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  // State untuk melacak apakah teks password disembunyikan atau ditampilkan
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  // Fungsi untuk menangani perubahan input teks
  const handleChange = (input) => {
    // Atur state teks lokal
    setText(input);

    // Validasi input berdasarkan tipe
    const validationError = validateInput(input, type);
    setError(validationError);

    // Panggil fungsi onChangeText dari properti jika ada
    if (onChangeText) {
      onChangeText(input);
    }
  };

  // Fungsi untuk mengubah status secureTextEntry ketika ikon dipencet
  const toggleSecureTextEntry = () => {
    setSecureTextEntry((prevState) => !prevState);
  };

  return (
    <View>
      <TextInput
        style={{
          backgroundColor: "white",
          width: width * 0.9,
          fontSize: 15,
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
        // error={handleChange}
        onChangeText={handleChange}
        secureTextEntry={password ? secureTextEntry : false}
        right={
          password ? (
            <TextInput.Icon
              icon={secureTextEntry ? "eye-off" : "eye"}
              onPress={toggleSecureTextEntry}
            />
          ) : null
        }
      />

      {error && (
        <HelperText
          outlineColor={WARNA.red}
          activeUnderlineColor={WARNA.red}
          style={{ color: WARNA.red }}
          type="error"
          visible={!!error}
        >
          {error}
        </HelperText>
      )}
    </View>
  );
};

export default TextInputIconComponent;
