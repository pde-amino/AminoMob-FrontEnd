import React, { useContext, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ButtonPrimary from "../../../components/ButtonPrimary";
import TextInputIconComponent from "../../../components/TextInputIconComponent";
import BottomSheet from "../../../components/BottomSheet";
import { AuthContex } from "../../../contex/AuthProvider";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WARNA = { primary: "#0A78E2", white: "#fff" };
const { height, width } = Dimensions.get("window");

const LoginScreen = () => {
  const [status, setStatus] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigation = useNavigation();
  const { auth, setAuth } = useContext(AuthContex);
  console.log("Ini Data Auth :", auth);
  const handleUsernameChange = (input) => {
    setUsername(input);
    const onlyNumbers = /^[0-9]+$/.test(input);
    setUsernameError(onlyNumbers ? "" : "Cuma boleh pakai angka");
  };

  const handlePasswordChange = (input) => {
    setPassword(input);
    const containsSpecialChar = /[!@#$%^&*()_=+\-\[\]{};':"\\|,.<>\/?]/.test(
      input
    );
    setPasswordError(
      containsSpecialChar ? "Tidak boleh menggunakan karakter khusus" : ""
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://192.168.5.5:8080/login`,
        {
          user: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "pd3@mino347",
          },
        }
      );

      const userInfo = response.data;

      await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      setAuth(userInfo);
      console.log("ini user info:", userInfo);
      navigation.replace("Home Screen");

      // if (userInfo.message) {
      //   console.log("Login berhasil. Token:", userInfo);
      //   setAuth(userInfo);
      //   navigation.replace("Amino Care");
      // } else {
      //   console.log("Login gagal, pesan kesalahan:", userInfo.message);
      // }
    } catch (error) {
      Alert.alert("Haii", "Sepertinya password atau nomor HP anda salah");
      console.log("Login Error:", error);
    }
  };

  const handlePasienLama = () => {
    navigation.navigate("Signup Lama");
    setStatus(false);
  };

  const handlePasienBaru = () => {
    navigation.navigate("Signup Baru");
    setStatus(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}>
        <View style={{ gap: 8, marginBottom: 12 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.judul}>Masuk</Text>
          </View>

          <TextInputIconComponent
            label="Nomor RM/NIK/HP"
            placeholder="Masukkan salah satu"
            value={username}
            onChangeText={handleUsernameChange}
          />

          <TextInputIconComponent
            label="Kata Sandi"
            placeholder="Masukkan kata sandi di sini"
            password={true}
            value={password}
            onChangeText={handlePasswordChange}
          />
        </View>

        <ButtonPrimary
          title="Masuk"
          disabled={!!usernameError || !!passwordError}
          onPress={handleSubmit}
        />

        <View style={{ flexDirection: "row" }}>
          <Text>Belum punya akun?</Text>
          <TouchableOpacity onPress={() => setStatus(true)}>
            <Text
              style={{
                color: WARNA.primary,
                textDecorationLine: "underline",
                marginLeft: 3,
              }}>
              Daftar Akun Sekarang
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {status && (
        <BottomSheet
          setStatus={setStatus}
          ukuranModal={{ width: "100%", height: "25%" }}
          judul="Anda pernah periksa sebelumnya?"
          subjudul="Pilih Sudah jika pernah periksa dan punya No.RM di RSJD Amino"
          buttonKanan="Sudah"
          buttonKiri="Belum"
          pressKanan={handlePasienLama}
          pressKiri={handlePasienBaru}
        />
      )}
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
});

export default LoginScreen;
