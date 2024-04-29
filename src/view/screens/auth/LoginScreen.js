import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ButtonPrimary from "../../../components/ButtonPrimary";
import TextInputIconComponent from "../../../components/TextInputIconComponent";
import { Button } from "react-native";
import ConfirmModal from "../../../components/ConfirmModal";
import DialogComponent from "../../../components/DialogComponent";
import BottomSheet from "../../../components/BottomSheet";

const WARNA = { primary: "#0A78E2", white: "#fff" };
// const { height, width } = Dimensions.get("window");

const LoginScreen = () => {
  const [status, setStatus] = React.useState(false);

  const handleConfirm = () => {
    // Lakukan aksi konfirmasi di sini
    navigation.navigate("Pendaftaran");
    setStatus(false);
  };

  const handleCancel = () => {
    // Lakukan aksi pembatalan di sini
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

  // const handleEmailChange = (input) => {
  //   setEmail(input);
  //   // Periksa apakah input email valid, tambahkan validasi jika diperlukan
  // };

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

  const handleSubmit = () => {
    // Cetak data yang dikumpulkan di console
    console.log("Email:", email);
    console.log("Username:", username);
    console.log("Password:", password);

    // Lakukan sesuatu dengan data, misalnya menyimpan ke backend
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
            placeholder="Cukup salah satu"
            value={username}
            type={"username"}
            onChangeText={handleUsernameChange}
          />

          <TextInputIconComponent
            label="Kata Sandi"
            placeholder="Masukkan kata sandi  di sini"
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
        {/* <Button title="Submit" onPress={handleSubmit} /> */}

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
          pressKanan={handleConfirm}
          pressKiri={handleCancel}
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
