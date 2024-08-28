import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContex } from "../../../contex/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalStyles from "../../../style/GlobalStyles";
import ButtonPrimary from "../../../components/ButtonPrimary";
import axios from "axios";
import {
  BASE_URL,
  CHANGE_NUMB,
  OTP_DIVISION,
  OTP_ID,
  OTP_PASS,
  OTP_SENDER,
  SEND_OTP,
} from "../../../contex/Config";
import * as Network from "expo-network";
import ModalComponent from "../../../components/ModalComponent";
import AlertFormComponent from "../../../components/AlertFormComponent";

const OTPInputScreen = () => {
  const route = useRoute();
  const dataUser = route.params;
  const [otp, setOtp] = useState("");
  const { auth, setAuth } = useContext(AuthContex);
  const [sendOTP, setSendOTP] = useState("");
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [counter, setCounter] = useState(30);
  const [isCounting, setIsCounting] = useState(true);
  const [text, setText] = useState("");

  const handleChangeText = (numb) => {
    setText(numb);
  };

  const handleCloseAlert = () => {
    setModal(false);
  };

  const submitChangeNumber = async (text) => {
    try {
      const change = await axios
        .put(
          `${CHANGE_NUMB}`,
          {
            user: dataUser.nik,
            password: dataUser.pasing,
            telp: text,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key":
                "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
            },
          }
        )
        .then(async (response) => {
          // console.log("ResponseAPI", response.data);
          try {
            await axios.post(
              `${SEND_OTP}`,
              {
                userid: OTP_ID,
                password: OTP_PASS,
                msisdn: response.data.telp,
                message: `Kode OTP Anda ${response.data.otp}. Jangan Bagikan Kode OTP Anda, OTP Berlaku 2 Menit.`,
                sender: OTP_SENDER,
                division: OTP_DIVISION,
              },
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            );
          } catch (error) {
            Alert.alert(
              "Error",
              "Gagal mengirim ulang OTP. Silakan coba lagi."
            );
          }
          setModal(false);
          Alert.alert(
            "Success",
            "Nomor telepon berhasil diubah, cek SMS untuk melihat kode OTP."
          );
        })
        .catch((error) => {
          // console.log("ErrorAPI", error.status);
          setModal(false);
          Alert.alert(
            "Gagal",
            "Nomor telepon gagal diubah pastikan nomor benar dan berbeda dengan nomor sebelumnya atau coba beberapa saat lagi."
          );
        });
      // setModal(false);
      // Alert.alert("Success", "Nomor telepon berhasil diubah");
    } catch (error) {
      try {
        if (error == "AxiosError: Request failed with status code 500") {
          Alert.alert(
            "Maaf",
            "Sepertinya Kami sedang melakukan pemeliharaan sistem, mohon ulangi beberapa saat lagi"
          );
          setLoading(false);
        } else {
          Alert.alert("Ups!", "No HP atau password Anda salah");
          setLoading(false);
        }
      } catch (error) {
        Alert.alert("Maaf", "Sepertinya password atau nomor HP anda salah");
      }
    }
  };

  const handlePasswordSubmit = (password) => {
    // console.log("Password entered:", password);

    handleCloseAlert();
  };

  const handleSendOtp = async () => {
    setCounter(120);
    setIsCounting(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/ulangOtp`,
        {
          telp: dataUser.response.telp,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
          },
        }
      );
      setSendOTP(response.data.otp);
      await resend(response.data.otp);
    } catch (error) {
      Alert.alert("Error", "Gagal mengirim OTP. Silakan coba lagi.");
    }
  };

  const resend = async (otp) => {
    try {
      await axios.post(
        `${SEND_OTP}`,
        {
          userid: OTP_ID,
          password: OTP_PASS,
          msisdn: dataUser.response.telp,
          message: `Kode OTP Anda ${otp}. Jangan Bagikan Kode OTP Anda, OTP Berlaku 2 Menit.`,
          sender: OTP_SENDER,
          division: OTP_DIVISION,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    } catch (error) {
      Alert.alert("Error", "Gagal mengirim ulang OTP. Silakan coba lagi.");
    }
  };

  useEffect(() => {
    let timer;
    if (isCounting) {
      timer = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter <= 1) {
            clearInterval(timer);
            setIsCounting(false);
            return 30;
          }
          return prevCounter - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCounting]);

  const handleOTPSubmit = async () => {
    const ip = await Network.getIpAddressAsync();
    try {
      await axios.post(
        `${BASE_URL}/otp`,
        {
          telp: dataUser.response.telp,
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
      const userInfo = {
        ...auth,
        otpVerified: true,
      };
      await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      setAuth(userInfo);

      Alert.alert(
        "Success",
        "Kode OTP valid. Silahkan Login menggunakan nomor yang anda daftarkan.",
        [{ text: "OK", onPress: () => navigation.navigate("Login Screen") }]
      );
    } catch (error) {
      Alert.alert("Error", "Gagal menyimpan data pengguna. Silakan coba lagi.");
    }
  };

  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.match(/.{1,4}/g).join("-");
  };

  const formattedNumber = formatPhoneNumber(dataUser.response.telp);

  return (
    <View style={styles.container}>
      <Text style={[GlobalStyles.h1, { marginBottom: 20 }]}>
        Masukkan Kode OTP
      </Text>
      <Text
        style={[
          GlobalStyles.textBiasa,
          {
            marginBottom: 20,
            maxWidth: "80%",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          },
        ]}>
        Kode OTP akan dikirim melalui SMS ke nomor{" "}
        <Text style={{ letterSpacing: 1, fontWeight: "bold" }}>
          {formattedNumber}
        </Text>
        , pastikan nomor aktif.
      </Text>
      <Text>Jika nomor diatas salah/tidak aktif silahkan :</Text>
      <TouchableOpacity onPress={() => setModal(true)}>
        <Text
          style={[
            { marginBottom: "8%" },
            GlobalStyles.textLink,
            isCounting && styles.linkDisabled,
          ]}>
          Ganti Nomor
        </Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Masukan Kode OTP disini."
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={6}
      />

      <View style={GlobalStyles.btnFullContainer}>
        <ButtonPrimary title="Verifikasi" onPress={handleOTPSubmit} />
      </View>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        {isCounting ? (
          <Text
            style={[GlobalStyles.textLink, isCounting && styles.linkDisabled]}>
            Coba lagi dalam {counter} detik
          </Text>
        ) : (
          <>
            <Text style={GlobalStyles.textBiasa}>Belum dapat OTP? </Text>
            <TouchableOpacity
              onPress={handleSendOtp}
              disabled={isCounting}
              style={{
                alignItems: "center",
              }}>
              <Text
                style={[
                  GlobalStyles.textLink,
                  isCounting && styles.linkDisabled,
                ]}>
                Kirim Ulang
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <AlertFormComponent
        title={"Masukan Nomor Baru"}
        placeholder={"Nomor Baru"}
        visible={modal}
        onClose={handleCloseAlert}
        onSubmit={() => submitChangeNumber(text)}
        onChangeText={handleChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "60%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#0A78E2",
    borderRadius: 10,
    marginBottom: 100,
  },
  linkDisabled: {
    color: "#6F9FCC",
    textDecorationLine: "none",
  },
});

export default OTPInputScreen;
