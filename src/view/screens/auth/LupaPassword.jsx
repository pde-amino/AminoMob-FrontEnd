import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ButtonPrimary from "../../../components/ButtonPrimary";
import TextInputIconComponent from "../../../components/TextInputIconComponent";
import { AuthContex } from "../../../contex/AuthProvider";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalStyles from "../../../style/GlobalStyles";
import {
  BASE_URL,
  OTP_DIVISION,
  OTP_ID,
  OTP_PASS,
  OTP_SENDER,
  SEND_OTP,
} from "../../../contex/Config";
import { Portal, Modal } from "react-native-paper";
import * as Network from "expo-network";
import TextInputComponentModal from "../../../components/TextInputComponentModal";

const WARNA = { primary: "#0A78E2", white: "#fff" };

const LupaPassword = () => {
  const [username, setUsername] = useState("");
  const [nik, setNIK] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [newPassError, setNewPassError] = useState("");
  const [confNewPassErr, serNewConfPassErr] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOTP, setmodalOTP] = useState(false);
  const [modalPass, setmodalPass] = useState(false);

  const [idUser, setIdUser] = useState("");
  const [token, setToken] = useState("");

  const navigation = useNavigation();
  const { auth, setAuth } = useContext(AuthContex);

  useEffect(() => {
    validatePasswords();
  }, [newPass, confirmNewPass]);

  const validatePasswords = () => {
    const adaSpecialChar = /[!@#$%^&*()_=+\-\[\]{};':"\\|,.<>\/?]/.test(
      newPass
    );
    if (adaSpecialChar) {
      setNewPassError("Karakter yang diperbolehkan adalah A-Z, a-z, 0-9");
    } else if (newPass.length < 6) {
      setNewPassError("Password minimal 6 karakter");
    } else {
      setNewPassError("");
    }

    if (confirmNewPass !== newPass) {
      serNewConfPassErr("Tidak cocok dengan password");
    } else {
      serNewConfPassErr("");
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/pass`,
        {
          telp: username,
          nik: nik,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
          },
        }
      );

      // console.log("handleSubmit", response.data);

      if (response.data.status === true) {
        setIdUser(response.data.id);
        setToken(response.data.token);
        setLoading(false);
        sendOTP(response.data.otp);
        setmodalOTP(true);
      } else {
        setLoading(false);
        // console.log(response.data.status);
      }
    } catch (error) {
      if (error == "AxiosError: Request failed with status code 500") {
        // console.error(error);
        Alert.alert(
          "Upss!",
          "Kami sedang melakukan pemeliharaan sistem, mohon ulangi beberapa saat lagi"
        );
        setLoading(false);
      } else {
        // console.error(error);
        Alert.alert(
          "Ups!",
          "No HP atau NIK Anda belum terdaftar, silakan daftar terlebih dahulu"
        );
        setLoading(false);
      }
    }
  };

  const sendOTP = async (otp) => {
    await axios.post(
      `${SEND_OTP}`,
      {
        userid: OTP_ID,
        password: OTP_PASS,
        msisdn: username,
        message: `OTP Amino Mobile Ganti Password Anda adalah ${otp}. Jangan bagikan kode OTP Anda pada siapapun, OTP berlaku 2 Menit.`,
        sender: OTP_SENDER,
        division: OTP_DIVISION,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  };

  const verifyOTP = async () => {
    const ip = await Network.getIpAddressAsync();
    try {
      const responseVerify = await axios.post(
        `${BASE_URL}/otp`,
        {
          telp: username,
          otp: otp,
          ip: ip,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
          },
        }
      );
      // const userInfo = {
      //   ...auth,
      //   otpVerified: true,
      // };
      // await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      // setAuth(userInfo);

      if (responseVerify.data.status === true) {
        setmodalOTP(false);
        Alert.alert("Success", "Kode OTP valid");
        // console.log("verifyOTP", responseVerify.data);
        setmodalPass(true);
      }
    } catch (error) {
      // console.error(error);
      Alert.alert("Error", "Gagal menyimpan data pengguna. Silakan coba lagi.");
    }
  };

  const gantiPass = async () => {
    try {
      const responseGantiPass = await axios.put(
        `${BASE_URL}/pass/${idUser}`,
        {
          telp: username,
          pass: newPass,
          confirm_pass: confirmNewPass,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
            Authorization: `Bearer ${token}`, // Menambahkan token ke header
          },
        }
      );

      if (responseGantiPass.data.status === true) {
        setmodalPass(false);
        Alert.alert("Success", "Password berhasil diganti");
        navigation.replace("Login Screen");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const maskedUsername = (username) => {
    if (username.length < 7) {
      // Jika kurang dari 7 karakter, kembalikan username apa adanya
      return username;
    }

    const firstPart = username.slice(0, 3);
    const lastPart = username.slice(-4);
    const hiddenPart = "*".repeat(username.length - 7); // Sembunyikan sisanya dengan *

    return `${firstPart}${hiddenPart}${lastPart}`;
  };

  return (
    <View style={GlobalStyles.utama}>
      <StatusBar
        hidden={false}
        barStyle="dark-content"
        backgroundColor={"white"}
      />
      <View style={GlobalStyles.Content}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              style={[
                GlobalStyles.h1,
                { color: WARNA.primary, paddingBottom: 40 },
              ]}
            >
              Lupa Password
            </Text>
          </View>
          <View style={{ gap: 8, marginBottom: 12 }}>
            <TextInputIconComponent
              label="Nomor HP"
              placeholder="Masukkan No HP Anda"
              value={username}
              type={"nomor"}
              inputMode={"numeric"}
              onChangeText={setUsername}
            />
            <TextInputIconComponent
              label="NIK"
              placeholder="Masukkan NIK Anda"
              value={nik}
              type={"ktp"}
              inputMode={"numeric"}
              onChangeText={setNIK}
            />
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <ButtonPrimary
                title="Kirim"
                // disabled={!!usernameError || !!nikError}
                onPress={handleSubmit}
              />
            </>
          )}
        </ScrollView>

        {/* modal untuk OTP */}
        <Portal>
          <Modal
            visible={modalOTP}
            contentContainerStyle={styles.modalView}
            dismissable={false}
          >
            <Text style={GlobalStyles.h2}>Verifikasi Kode OTP</Text>
            <View style={styles.modalContent}>
              <View style={{ alignItems: "center", marginBottom: 15 }}>
                <Text style={GlobalStyles.textBiasa}>
                  OTP akan dikirim lewat SMS ke nomor
                </Text>
                <Text style={GlobalStyles.textChipSucces}>
                  {maskedUsername(username)}
                </Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Masukan Kode OTP disini."
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
                maxLength={4}
              />
              <ButtonPrimary title="Verifikasi" onPress={verifyOTP} />
            </View>
          </Modal>
        </Portal>

        {/* modal untuk password baru */}
        <Portal>
          <Modal
            visible={modalPass}
            contentContainerStyle={styles.modalView}
            dismissable={false}
          >
            <Text style={GlobalStyles.h2}>Masukkan Kata Sandi Baru</Text>
            <View style={styles.modalContent}>
              <TextInputComponentModal
                label={"Kata Sandi Baru"}
                placeholder={"Buat kata sandi baru"}
                type={"password"}
                value={newPass}
                onChangeText={setNewPass}
                password={true}
              />
              {newPassError ? (
                <Text style={styles.errorText}>{newPassError}</Text>
              ) : null}
              <TextInputComponentModal
                label={"Ulang Kata Sandi Baru"}
                placeholder={"Ulangi kata sandi baru1"}
                type={"password"}
                value={confirmNewPass}
                onChangeText={setConfirmNewPass}
                password={true}
              />
              {confNewPassErr ? (
                <Text style={styles.errorText}>{confNewPassErr}</Text>
              ) : null}
              <ButtonPrimary
                title="Ganti"
                disabled={!!newPassError || !!confNewPassErr}
                onPress={gantiPass}
              />
            </View>
          </Modal>
        </Portal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent: {
    gap: 10,
    marginTop: 15,
    width: "100%",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#0A78E2",
    borderRadius: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 5,
  },
});

export default LupaPassword;
