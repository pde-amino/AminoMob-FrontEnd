import React, { useContext, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Linking,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ButtonPrimary from "../../../components/ButtonPrimary";
import TextInputIconComponent from "../../../components/TextInputIconComponent";
import { Button } from "react-native";
import ConfirmModal from "../../../components/ConfirmModal";
import DialogComponent from "../../../components/DialogComponent";
import BottomSheet from "../../../components/BottomSheet";
import DropdownComponent from "../../../components/DropdownComponent";
import DropdownTesting from "../../../components/DropdownTesting";
import { AuthContex } from "../../../contex/AuthProvider";
import axios from "axios";
import DatePicker from "../../../components/DatePicker";

const WARNA = { primary: "#0A78E2", white: "#fff" };
// const { height, width } = Dimensions.get("window");

const LoginScreen = () => {
  const [status, setStatus] = React.useState(false);

  const handlePasienLama = () => {
    // Lakukan aksi konfirmasi di sini
    navigation.navigate("Signup Lama");
    setStatus(false);
  };

  const handlePasienBaru = () => {
    // Lakukan aksi pembatalan di sini
    navigation.navigate("Signup Baru");
    setStatus(false);
  };

  // State untuk menyimpan input pengguna
  // const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // const [error, setError] = useState("");

  const navigation = useNavigation();

  const handleUsernameChange = (input) => {
    setUsername(input);
    // Validasi untuk username hanya berisi angka
    const onlyNumbers = /^[0-9]+$/.test(input);
    if (!onlyNumbers) {
      setUsernameError("Cuma boleh pakai angka");
    } else {
      setUsernameError("");
    }
  };

  const handlePasswordChange = (input) => {
    setPassword(input);
    // Validasi untuk password tidak boleh mengandung karakter khusus
    const containsSpecialChar = /[!@#$%^&*()_=+\-\[\]{};':"\\|,.<>\/?]/.test(
      input
    );
    if (containsSpecialChar) {
      setPasswordError("Tidak boleh menggunakan karakter khusus");
    } else {
      setPasswordError("");
    }
  };

  const { setData } = useContext(AuthContex);
  const [userInfo, setUserInfo] = useState();

  const login = (username, password) => {
    axios
      .post(`http://192.168.5.5:8080/login`, {
        user: username,
        password: password,
      })
      .then(async (res) => {
        const userInfo = res.data;

        // Simpan userInfo ke AsyncStorage dan tangani error di sini
        try {
          await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
          setUserInfo(userInfo);

          // Periksa status respons
          if (userInfo.status) {
            console.log("Login berhasil. Token:", userInfo);
            // Navigasi ke screen "Amino Care" dan kirim data token dan id
            setData(userInfo);
            navigation.replace("Amino Care");
          } else {
            // Tangani kesalahan login
            const errorMessage = userInfo.message || "Kesalahan tidak dikenal";
            console.log("Login gagal, pesan kesalahan:", errorMessage);
          }
        } catch (error) {
          console.log("Gagal menyimpan userInfo ke AsyncStorage:", error);
        }
      })
      .catch((error) => {
        console.log("Login Error:", error);
      });
  };

  const handleSubmit = async () => {
    Linking.openURL("https://api.whatsapp.com/send?phone=6281213536824");
    // Cetak data yang dikumpulkan di console
    // console.log("Email:", email);
    // console.log("Username:", username);
    // console.log("Password:", password);

    const data = {
      user: username,
      password: password,
    };

    try {
      const response = await fetch("http://192.168.5.5:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login gagal:", errorData);
        alert(`Login gagal:\n${JSON.stringify(errorData)}`);
        return;
      }

      // switch (result.akun) {
      //   case "Belum Terverifikasi":
      //     navigation.replace("Profile Screen");
      //     break;
      //   case "Proses Verifikasi":
      //     navigation.replace("Profile Screen");
      //     break;
      //   default:
      //     navigation.replace("Amino Care");
      // }

      const result = await response.json();
      console.log("Login berhasil:", result.message);
      if (result.akun == "Belum Terverifikasi") {
        setData(result);
        navigation.replace("Profile Screen");
      }
      if (result.akun == "Proses Verifikasi") {
        setData(result);
        navigation.replace("Profile Screen");
      } else {
        setData(result);
        navigation.replace("Amino Care");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert(
        "Maaf sepertinya sedang ada kendala pada jaringan internet kami. Tunggu sebentar dan coba lagi."
      );
    }
  };

  const identitas = async () => {
    const response = await fetch("http://192.168.5.5:8080/cariId?id=", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const keRegist = () => {
    navigation.navigate("Pendaftaran");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View style={{ gap: 8, marginBottom: 12 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.judul}>Masuk</Text>
          </View>

          <TextInputIconComponent
            label="Nomor RM/NIK/HP"
            placeholder="Masukkan salah satu"
            value={username}
            type={"username"}
            onChangeText={setUsername}
          />

          <TextInputIconComponent
            label="Kata Sandi"
            placeholder="Masukkan kata sandi  di sini"
            password={true}
            value={password}
            onChangeText={setPassword}
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
              }}
            >
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
