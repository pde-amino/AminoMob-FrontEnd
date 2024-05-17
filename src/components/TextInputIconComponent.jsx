import React, { useState } from "react";
import { Alert, Dimensions, View } from "react-native";
import { TextInput, HelperText } from "react-native-paper";

const WARNA = { primary: "#0A78E2", white: "#fff", red: "#F01F1F" };
const { width } = Dimensions.get("window");

const validateInput = (input, type) => {
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
  return "";
};

const handleTextInputChange = (text) => {
  // Menampilkan alert saat pengguna memasukkan nilai
  Alert.alert(
    "Peringatan",
    "Data Tidak Dapat Diubah Sebelum Melakukan Verifikasi."
  );
  // setInputValue(text);
};

const TextInputIconComponent = ({
  label,
  placeholder,
  type,
  onChangeText,
  password,
  value,

  maskValue, // Prop baru untuk mengontrol masking
}) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(
    password ? true : false
  );

  const handleChange = (input) => {
    setText(input);
    const validationError = validateInput(input, type);
    setError(validationError);
    if (onChangeText) {
      onChangeText(input);
    }
  };

  const toggleSecureTextEntry = () => {
    if (maskValue) {
      setSecureTextEntry((prevState) => !prevState);
    } else {
      alert("Mohon Lakukan Verifikasi Akun Terlebih Dahulu");
    }
  };

  const getDisplayValue = (value) => {
    if (!maskValue || !value) return value;

    // Memisahkan nilai menjadi array kata-kata
    const words = value.split(" ");

    // Mengubah setiap kata menjadi tiga karakter pertama
    const maskedWords = words.map((word) => {
      // Mengambil tiga karakter pertama dari kata
      const visiblePart = word.slice(0, 1);
      // Membuat bagian tersisa menjadi tanda '*'
      const maskedPart = "*".repeat(word.length - visiblePart.length);
      return `${visiblePart}${maskedPart}`;
    });

    // Menggabungkan kembali kata-kata yang telah dimodifikasi
    const maskedValue = maskedWords.join(" ");

    return maskedValue;
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
        value={getDisplayValue(value)}
        onChangeText={maskValue ? handleTextInputChange : handleChange}
        secureTextEntry={secureTextEntry}
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
          visible={!!error}>
          {error}
        </HelperText>
      )}
    </View>
  );
};

export default TextInputIconComponent;
