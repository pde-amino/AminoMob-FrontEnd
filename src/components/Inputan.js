import * as React from "react";
import { Dimensions, View } from "react-native";
import { TextInput, HelperText } from "react-native-paper";

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
  <View style={{ width: width * 0.9, alignContent: "center" }}>
    <TextInput
      style={{ backgroundColor: "white" }}
      mode="outlined"
      selectionColor={WARNA.primary}
      outlineColor={WARNA.primary}
      activeOutlineColor={WARNA.primary}
      underlineColor={WARNA.primary}
      activeUnderlineColor={WARNA.primary}
      placeholderTextColor={"grey"}
      label={label}
      placeholder={placeholder}
    />
    <HelperText type="error">Email address is invalid!</HelperText>
  </View>
);

export default Inputan;
