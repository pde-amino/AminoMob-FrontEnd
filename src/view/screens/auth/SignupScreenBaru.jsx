import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ButtonPrimary from "../../../components/ButtonPrimary";
import HomeScreen from "../home/HomeScreen";
import { Ionicons } from "react-native-vector-icons";
import TextInputComponent from "../../../components/TextInputComponent";
import TextInputIconComponent from "../../../components/TextInputIconComponent";
import GlobalStyles from "../../../style/GlobalStyles";
import axios from "axios";
import { BASE_URL } from "../../../contex/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const [user, setUser] = useState([]);

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const simpanData = async () => {
    validatePasswords();
    if (passwordError) {
      Alert.alert("Maaf, mohon pastikan password benar");
      return;
    }

    const data = {
      NO_RM: noRm,
      telp: noTelp,
      password: password,
      confirm_password: confirmPassword,
    };

    try {
      const token =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2dpbi1hcGktcHJvamVjdCIsInN1YiI6ImxvZ2ludG9rZW4iLCJpYXQiOjE3MTYxNzAyMTksImV4cCI6MTcxNjI1NjYxOSwidWlkIjoiNCIsIm5vX3JrbV9tZWRpcyI6bnVsbH0.th7rafe55P0xDcpepQoVkJzbqXvrj0Bm_Q0LCY8vyAo";
      const register = await axios.post(`${BASE_URL}/register`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Assuming the response contains the user data
      const userData = register.data;
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      Alert.alert("Berhasil", "Registrasi berhasil!");
    } catch (error) {
      console.log("Error response", error.response);
      Alert.alert(
        "Gagal Mendaftar",
        "Gagal Mendaftar : " + (error.response?.data?.message || error.message)
      );
    }
  };

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
    const adaSpecialChar = /[!@#$%^&*()_=+\-\[\]{};':"\\|,.<>\/?]/.test(text);
    const adaUppercase = /[A-Z]/.test(text);

    if (adaSpecialChar) {
      setPasswordError("Karakter yang diperbolehkan adalah A-Z, a-z, 0-9");
    } else if (!adaUppercase) {
      setPasswordError("Password harus terdapat minimal satu huruf kapital");
    } else {
      setPasswordError("");
    }
    setPassword(text);
  };

  const handleConfPasswordChange = (text) => {
    if (text !== password) {
      setConfPasswordError("Tidak cocok dengan password");
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
    setNoRM(text);
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
    setNoTelp(text);
  };

  const isDisabled = passwordError || confPasswordError || RMError || HPError;

  return (
    <View style={GlobalStyles.Content}>
      <View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.judul}>Daftar Akun</Text>
        </View>

        <View style={{ gap: 8 }}>
          <TextInputIconComponent
            label={"No Rekam Medis"}
            placeholder={"Masukan No RM Anda"}
            type={"username"}
            value={noRm}
            onChangeText={handleNoRM}
          />
          {RMError ? <Text style={styles.errorText}>{RMError}</Text> : null}
          <TextInputIconComponent
            label={"No Handphone"}
            placeholder={"Masukan No HP Anda"}
            type={"username"}
            value={noTelp}
            onChangeText={handleNoHP}
          />
          {HPError ? <Text style={styles.errorText}>{HPError}</Text> : null}
          <TextInputIconComponent
            label={"Buat Kata Sandi"}
            placeholder={"Buat Kata Sandi"}
            type={"password"}
            value={password}
            onChangeText={handlePasswordChange}
            password={true}
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
          <TextInputIconComponent
            label={"Masukan Ulang Kata Sandi"}
            placeholder={"Masukan kata sandi lagi"}
            type={"password"}
            value={confirmPassword}
            onChangeText={handleConfPasswordChange}
            password={true}
          />
          {confPasswordError ? (
            <Text style={styles.errorText}>{confPasswordError}</Text>
          ) : null}
          <ButtonPrimary
            title="Daftar"
            onPress={simpanData}
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
              onPress={() => navigation.navigate("Login Screen")}>
              Masuk disini
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
