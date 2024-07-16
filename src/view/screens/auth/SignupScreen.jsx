import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonPrimary from "../../../components/ButtonPrimary";
import TextInputIconComponent from "../../../components/TextInputIconComponent";
import GlobalStyles from "../../../style/GlobalStyles";
// import DateTimePicker from "@react-native-community/datetimepicker";
import { BASE_URL } from "../../../contex/Config";

const WARNA = { primary: "#0A78E2", white: "#fff" };

const { width } = Dimensions.get("window");

const SignupScreen = () => {
  const navigation = useNavigation();
  const [showPicker, setShowPicker] = useState(false);
  const toggleShowDate = () => {
    setShowPicker(!showPicker);
  };
  const [dateOfBirth, setDateOfBirth] = useState("");
  const berubah = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleShowDate();
        setDateOfBirth(currentDate.toISOString().split("T")[0]);
      }
    } else {
      toggleShowDate();
    }
  };
  const [date, setDate] = useState(new Date());

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confPasswordError, setConfPasswordError] = useState("");
  const [noHP, setHP] = useState("");
  const [noKTP, setKTP] = useState("");
  const [nmLengkap, setNama] = useState("");
  // const data = {
  //   telp: noHP,
  //   nik: noKTP,
  //   password: password,
  //   confirm_password: confirmPassword,
  // };
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
    try {
      const response = await axios.post(
        `${BASE_URL}/register`,
        {
          nama: nmLengkap,
          telp: noHP,
          nik: noKTP,
          password: password,
          confirm_password: confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "pd3@mino347",
          },
        }
      );
      const userInfo = response.data;

      await AsyncStorage.setItem("user", JSON.stringify(userInfo));

      const userData = response.data;
      navigation.navigate("OTPInputScreen", userData);
      console.log("alksdlkjasldkjlaksdjklasj", userData);
    } catch (error) {
      console.log("Error response", error.response);
      Alert.alert(
        "Gagal Mendaftar",
        "Sepertinya Nomor HP atau NIK sudah didaftarkan"
      );
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.utama}>
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
            <Text style={[GlobalStyles.h1, { color: WARNA.primary }]}>
              Daftar Akun
            </Text>
          </View>

          <View style={{ marginBottom: 12, gap: 8 }}>
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

            {/* <View>
              {showPicker && (
                <DateTimePicker
                  mode="date"
                  onChange={berubah}
                  value={date}
                  minimumDate={new Date(1935, 12, 31)}
                  maximumDate={new Date()}
                />
              )}

              {!showPicker && (
                <Pressable onPress={toggleShowDate}>
                  <TextInput
                    style={styles.tglPilihan}
                    editable={false}
                    placeholder={"Tanggal Lahir*"}
                    value={dateOfBirth}
                    onChangeText={setDateOfBirth}
                  />
                </Pressable>
              )}
            </View> */}

            <TextInputIconComponent
              label={"Buat Kata Sandi"}
              placeholder={"Buat Kata Sandi"}
              type={"password"}
              value={password}
              onChangeText={setPassword}
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
              onChangeText={setConfPassword}
              password={true}
            />

            {confPasswordError ? (
              <Text style={styles.errorText}>{confPasswordError}</Text>
            ) : null}
          </View>

          <View style={{ paddingTop: 8 }}>
            <ButtonPrimary
              title="Daftar"
              onPress={simpanData}
              disabled={passwordError || confPasswordError}
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text style={GlobalStyles.textBiasa}>Sudah Punya akun?</Text>
            <TouchableOpacity>
              <Text
                style={GlobalStyles.textLink}
                onPress={() => {
                  navigation.navigate("Login Screen");
                }}
              >
                Masuk disini
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 5,
  },
});

export default SignupScreen;
