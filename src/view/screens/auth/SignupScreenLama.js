import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ButtonPrimary from "../../../components/ButtonPrimary";
import HomeScreen from "../home/HomeScreen";
import { Ionicons } from "react-native-vector-icons";
import TextInputComponent from "../../../components/TextInputComponent";
import TextInputIconComponent from "../../../components/TextInputIconComponent";
import GlobalStyles from "../../../style/GlobalStyles";

const WARNA = { primary: "#0A78E2", white: "#fff" };

const { height, width } = Dimensions.get("window");

const RegistrationScreen = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [confPasswordError, setConfPasswordError] = useState("");
  const [RMError, setRMError] = useState("");
  const [RM, setRM] = useState("");
  const [HPError, setHPError] = useState("");
  const [HP, setHP] = useState("");

  const navigation = useNavigation();

  const keRegist = () => {
    navigation.navigate(HomeScreen);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfPassword = () => {
    setShowConfPassword(!showConfPassword);
  };

  const handlePasswordChange = (text) => {
    // Cek apakah teks password mengandung karakter khusus
    const adaSpecialChar = /[!@#$%^&*()_=+\-\[\]{};':"\\|,.<>\/?]/.test(text);
    const adaUppercase = /[A-Z]/.test(text);

    if (adaSpecialChar) {
      setPasswordError("Karakter yang diperbolehkan adalah A-Z, a-z, ");
    } else if (!adaUppercase) {
      setPasswordError("Password harus terdapat minimal satu huruf kapital");
    } else {
      setPasswordError("");
    }
    setPassword(text);
  };

  const handleConfPasswordChange = (text) => {
    // Cek apakah teks password mengandung karakter khusus
    // const adaSpecialChar = /[!@#$%^&*()_=+\-\[\]{};':"\\|,.<>\/?]/.test(text);
    // const adaUppercase = /[A-Z]/.test(text);

    if (text !== password) {
      setConfPasswordError("idak cocok dengan password");
    } else {
      setConfPasswordError("");
    }
    setConfPassword(text);
  };

  const handleNoRM = (text) => {
    const onlyAngka = /^[0-9]+$/.test(text);
    if (!onlyAngka) {
      setRMError("Cuma boleh pakai angka");
    } else if (text.length < 8) {
      setRMError("Angka yang dimasukkan tidak memenuhi jumlah minimal");
    } else {
      setRMError("");
    }
    setRM(text);
  };

  const handleNoHP = (text) => {
    const onlyAngka = /^[0-9]+$/.test(text);
    if (!onlyAngka) {
      setHPError("Cuma boleh pakai angka");
    } else if (text.length < 11) {
      setHPError("Angka yang dimasukkan tidak memenuhi jumlah minimal");
    } else {
      setHPError("");
    }
    setHP(text);
  };

  const isDisabled =
    // !password ||
    passwordError ||
    // !confirmPassword ||
    confPasswordError ||
    RMError ||
    // !RM ||
    HPError;
  // !HP;

  return (
    <View style={GlobalStyles.Content}>
      {/* <ScrollView> */}
      <View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.judul}>Daftar Akun</Text>
        </View>

        {/* inputan no rm */}
        <View style={{ gap: 8 }}>
          <TextInputIconComponent
            label={"No RM/HP/NIK"}
            placeholder={"Masukan Rekam Medis Anda"}
            type={"username"}
          />

          <TextInputIconComponent
            label={"No Handphone"}
            placeholder={"Masukan No HP Anda"}
            type={"username"}
          />

          <TextInputIconComponent
            label={"Kata Sandi"}
            placeholder={"Buat Kata Sandi"}
            type={"password"}
            password={true}
          />

          <TextInputIconComponent
            label={"Masukan Ulang Kata Sandi"}
            placeholder={"Masukan kata sandi lagi"}
            type={"password"}
            password={true}
          />
          <ButtonPrimary title="Daftar" disabled={isDisabled} />
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text>Sudah Punya akun? </Text>
          <TouchableOpacity>
            <Text
              style={{
                color: WARNA.primary,
                textDecorationLine: "underline",
              }}
              onPress={() => navigation.navigate("Login Screen")}
            >
              Masuk disini
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  judul: {
    fontSize: 32,
    fontWeight: "bold",
    color: WARNA.primary,
    marginBottom: 10,
  },
  inputan: {
    height: 48,
    width: width * 0.9,
    borderWidth: 1,
    padding: 8,
    margin: 4,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 8,
  },
  showHideButton: {
    padding: 10,
  },
  tombol: {
    marginTop: 10,
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 5,
  },
  inputError: {
    borderColor: "red",
  },
});

export default RegistrationScreen;
