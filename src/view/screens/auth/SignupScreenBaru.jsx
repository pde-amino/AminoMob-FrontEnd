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

const SignupScreenBaru = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [confPasswordError, setConfPasswordError] = useState("");
  const [RMError, setRMError] = useState("");
  const [noRm, setNoRM] = useState("");
  const [HPError, setHPError] = useState("");
  const [noTelp, setNoTelp] = useState("");

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

  const handleDaftarClick = async () => {
    const data = {
      NO_RM: noRm,
      TELP: noTelp,
      PASSWD: password,
      confirm_password: confirmPassword,
    };

    try {
      const response = await fetch("http://192.168.5.5:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Cek apakah respons berhasil (status 2xx)
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Pendaftaran gagal:", errorData);
        // Tampilkan pesan kesalahan kepada pengguna
        alert(`Pendaftaran gagal:\n${JSON.stringify(errorData)}`);
        return;
      }

      // Jika respons berhasil, parse JSON
      const result = await response.json();
      console.log("Pendaftaran berhasil:", result);
      navigation.navigate("Login Screen");
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert("Terjadi kesalahan saat mencoba mendaftar. Silakan coba lagi.");
    }
  };

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
            label={"No Rekam Medis"}
            placeholder={"Masukan No RM Anda"}
            type={"username"}
            value={noRm}
            onChangeText={setNoRM}
          />
          <TextInputIconComponent
            label={"No Handphone"}
            placeholder={"Masukan No HP Anda"}
            type={"username"}
            value={noTelp}
            onChangeText={setNoTelp}
          />

          <TextInputIconComponent
            label={"Buat Kata Sandi"}
            placeholder={"Buat Kata Sandi"}
            type={"password"}
            value={password}
            onChangeText={setPassword}
            password={true}
          />

          <TextInputIconComponent
            label={"Masukan Ulang Kata Sandi"}
            placeholder={"Masukan kata sandi lagi"}
            type={"password"}
            value={confirmPassword}
            onChangeText={setConfPassword}
            password={true}
          />
          <ButtonPrimary
            title="Daftar"
            onPress={handleDaftarClick}
            disabled={isDisabled}
          />
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
    marginBottom: 32,
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

export default SignupScreenBaru;
