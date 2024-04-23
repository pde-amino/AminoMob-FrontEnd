import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ButtonPrimary from "../../../components/ButtonPrimary";
import HomeScreen from "../home/HomeScreen";
import { Ionicons } from "react-native-vector-icons";

const WARNA = { primary: "#0A78E2", white: "#fff" };

const RegistrationScreen = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  // const [unameError, setUnameError] = useState("");
  // const [uname, setUname] = useState("");
  const [RMError, setRMError] = useState("");
  const [RM, setRM] = useState("");
  const [HPError, setHPError] = useState("");
  const [HP, setHP] = useState("");

  const navigation = useNavigation();

  const keRegist = () => {
    navigation.navigate(HomeScreen);
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

  const handleNoRM = (text) => {
    const onlyAngka = /^[0-9]+$/.test(text);
    if (!onlyAngka) {
      setRMError("Cuma boleh pakai angka");
    } else {
      setRMError("");
    }
    setRM(text);
  };

  const handleNoHP = (text) => {
    const onlyAngka = /^[0-9]+$/.test(text);
    if (!onlyAngka) {
      setHPError("Cuma boleh pakai angka");
    } else {
      setHPError("");
    }
    setHP(text);
  };

  const isDisabled =
    !password ||
    !passwordError ||
    !unameError ||
    !uname ||
    !RMError ||
    !RM ||
    !HPError ||
    !HP;

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
              <Text style={styles.judul}>Daftar Akun</Text>
            </View>

            {/* inputan no rm */}
            <View>
              <TextInput
                style={[styles.inputan, RMError && styles.inputError]}
                selectionColor={"blue"}
                placeholder="No. RM"
                placeholderTextColor={"grey"}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={handleNoRM}
              />
            </View>

            {RMError ? <Text style={styles.errorText}>{RMError}</Text> : null}

            {/* inputan no hp */}
            <View>
              <TextInput
                style={[styles.inputan, HPError && styles.inputError]}
                selectionColor={"blue"}
                placeholder="No. Handphone"
                placeholderTextColor={"grey"}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={handleNoHP}
              />
            </View>

            {HPError ? <Text style={styles.errorText}>{HPError}</Text> : null}

            {/* inputan password */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                style={[styles.inputan, passwordError && styles.inputError]}
                selectionColor={"blue"}
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
            {/* inputan confirm password */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                style={[styles.inputan, passwordError && styles.inputError]}
                selectionColor={"blue"}
                placeholder="Konfirmasi Password"
                placeholderTextColor={"grey"}
                autoCapitalize="none"
                secureTextEntry={!showPassword}
                value={confirmPassword}
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
              <ButtonPrimary title="Daftar" disabled={isDisabled} />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text>Sudah Punya akun?</Text>
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
    fontSize: 24,
    fontWeight: "bold",
    color: WARNA.primary,
    marginBottom: 10,
  },
  inputan: {
    height: 48,
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
    marginBottom: 8,
    marginLeft: 5,
  },
  inputError: {
    borderColor: "red",
  },
});

export default RegistrationScreen;
