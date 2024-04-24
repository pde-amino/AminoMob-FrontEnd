import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ButtonPrimary from "../../../components/ButtonPrimary";
import { Ionicons } from "react-native-vector-icons";

const WARNA = { primary: "#0A78E2", white: "#fff" };
const { height, width } = Dimensions.get("window");

const LoginScreen = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [unameError, setUnameError] = useState("");
  const [uname, setUname] = useState("");

  const navigation = useNavigation();

  const keRegist = () => {
    navigation.navigate("Pendaftaran"); //harus diubah ke halaman pendaftaran
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (text) => {
    // Cek apakah teks password mengandung karakter khusus
    const containsSpecialChar = /[!@#$%^&*()_=+\-\[\]{};':"\\|,.<>\/?]/.test(
      text
    );
    if (containsSpecialChar) {
      setPasswordError("Gak boleh pakai karakter itu");
    } else {
      setPasswordError("");
    }
    setPassword(text);
  };

  const handleUsernameChange = (text) => {
    const onlyAngka = /^[0-9]+$/.test(text);
    if (!onlyAngka) {
      setUnameError("Cuma boleh pakai angka");
    } else if (text.length < 8) {
      setUnameError("Periksa lagi jumlah angka");
    } else {
      setUnameError("");
    }
    setUname(text);
  };

  const isDisabled = !password || !!passwordError || !unameError || !uname;

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
        <KeyboardAvoidingView enabled>
          <View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.judul}>Masuk</Text>
            </View>

            <View>
              <TextInput
                style={[styles.inputan, unameError && styles.inputError]}
                selectionColor={"blue"}
                placeholder="No. Handphone/ No. RM"
                placeholderTextColor={"grey"}
                autoCapitalize="none"
                onChangeText={handleUsernameChange}
              />
            </View>
            {unameError ? (
              <Text style={styles.errorText}>{unameError}</Text>
            ) : null}

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                style={[styles.inputan, passwordError && styles.inputError]}
                selectionColor={WARNA.primary}
                placeholder="Password"
                placeholderTextColor={"grey"}
                autoCapitalize="none"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={handlePasswordChange}
                // keyboardType='password'
              />

              {/* icon mata */}
              <View style={{ position: "absolute", right: 10 }}>
                <TouchableOpacity
                  style={styles.showHideButton}
                  onPress={toggleShowPassword}
                >
                  <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} />
                </TouchableOpacity>
              </View>
            </View>

            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}

            {/* <TouchableOpacity style={styles.showHideButton} onPress={toggleShowPassword}>
                <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24}/>
                <Text style={{ textAlign: 'right' }}>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
              </TouchableOpacity> */}

            <View
              style={{ marginBottom: 8, marginTop: 8, alignItems: "center" }}
            >
              <ButtonPrimary title="Masuk" disabled={isDisabled} />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text>Belum Punya akun?</Text>
              <TouchableOpacity>
                <Text
                  style={{
                    color: WARNA.primary,
                    textDecorationLine: "underline",
                    marginLeft: 3,
                  }}
                  onPress={keRegist}
                >
                  Daftar Akun Sekarang
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
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
    height: 40,
    width: 350,
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
    marginTop: 2,
    marginBottom: 8,
    marginLeft: 5,
  },
  inputError: {
    borderColor: "red",
  },
});

export default LoginScreen;
