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
import { getTokenSourceMapRange } from "typescript";

const WARNA = { primary: "#0A78E2", white: "#fff" };

const { width } = Dimensions.get("window");

const SignupScreen = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [confPasswordError, setConfPasswordError] = useState("");
  const [noHP, setHP] = useState("");
  const [noKTP, setKTP] = useState("");
  const [nmLengkap, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [username, setUsername] = useState("");

  const [user, setUser] = useState([]);

  useEffect(() => {
    validatePasswords();
  }, [password, confirmPassword]);

  const validatePasswords = () => {
    const adaSpecialChar = /[!@#$%^&*()_=+\-\[\]{};':"\\|,.<>\/?]/.test(
      password
    );
    if (adaSpecialChar) {
      setPasswordError("Karakter yang diperbolehkan adalah A-Z, a-z, 0-9");
    } else if (password.length < 6) {
      setPasswordError("Password minimal 6 karakter");
    } else {
      setPasswordError("");
    }

    if (confirmPassword !== password) {
      setConfPasswordError("Tidak cocok dengan password");
    } else {
      setConfPasswordError("");
    }
  };

  const simpanData = async () => {
    if (passwordError || confPasswordError) {
      Alert.alert("Maaf, mohon pastikan password benar");
      return;
    }

    const data = {
      NO_RM: username,
      // telp: noTelp,
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

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleConfPasswordChange = (text) => {
    setConfPassword(text);
  };

  const daftarAkun = () => {
    navigation.navigate(HomeScreen);
  };

  return (
    <View style={GlobalStyles.utama}>
      <ScrollView>
        <View style={GlobalStyles.Content}>
          <Text style={[GlobalStyles.h1, { color: WARNA.primary }]}>
            Daftar Akun
          </Text>

          <View style={{ marginBottom: 12, gap: 8 }}>
            <TextInputIconComponent
              label={"Username"}
              placeholder={"Buat Username dengan minimal 8 karakter"}
              type={"username"}
              value={username}
              onChangeText={setUsername}
            />
            <TextInputIconComponent
              label={"Nama Lengkap"}
              type={"nama"}
              value={nmLengkap}
              onChangeText={setNama}
            />
            <TextInputIconComponent
              label={"No KTP"}
              type={"ktp"}
              value={noKTP}
              onChangeText={setKTP}
            />
            <TextInputIconComponent
              label={"No Handphone"}
              type={"nomor"}
              value={noHP}
              onChangeText={setHP}
            />
            <TextInputIconComponent
              label={"Alamat"}
              // type={"nomor"}
              value={alamat}
              onChangeText={setAlamat}
            />
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
              disabled={passwordError || confPasswordError}
            />
          </View>
        </View>
        <View style={{ flex: 1, marginHorizontal: 20, flexDirection: "row" }}>
          <Text style={GlobalStyles.textBiasa}>Sudah Punya akun? </Text>
          <TouchableOpacity>
            <Text style={GlobalStyles.textLink} onPress={daftarAkun}>
              Masuk disini
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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

export default SignupScreen;
