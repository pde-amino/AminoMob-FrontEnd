import * as React from "react";
import { Dimensions } from "react-native";
import { TextInput } from "react-native-paper";

const WARNA = { primary: "#0A78E2", white: "#fff" };

const { width, height } = Dimensions.get("window");

const toggleShowPassword = () => {
  setShowPassword(!showPassword);
};

const handlePasswordChange = (text) => {
  // Cek apakah teks password mengandung karakter khusus
  const containsSpecialChar = /[!@#$%^&*()_=+\-\[\]{};':"\\|,.<>\/?]/.test(
    text
  );
  if (containsSpecialChar) {
    setPasswordError("Gak boleh pakai karakter itu");
  } else {
    setPasswordError("");
  }
  setPassword(text);
};

const isDisabled = !password || !!passwordError || !unameError || !uname;
const handleUsernameChange = (text) => {
  const onlyAngka = /^[0-9]+$/.test(text);
  if (!onlyAngka) {
    setUnameError("Cuma boleh pakai angka");
  } else {
    setUnameError("");
  }
  setUname(text);
};

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
