import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { Button } from "react-native-paper";
import { AuthContex } from "../../../contex/AuthProvider";
import axios from "axios";
import { BASE_URL } from "../../../contex/Config";
import { useNavigation } from "@react-navigation/native";
// import { StatusBar } from "expo-status-bar";

const ChangePasswordForm = ({ onChangePassword }) => {
  const navigation = useNavigation();
  const { auth } = useContext(AuthContex);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (newPassword === confirmPassword) {
      // onChangePassword(currentPassword, newPassword);
      await axios
        .post(
          `${BASE_URL}/akun/${auth.id}`,
          {
            telp: auth.hp,
            oldpass: currentPassword,
            newpass: newPassword,
            confirm_password: confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.token}`, // Pastikan token disertakan dalam header jika diperlukan
              "Content-Type": "application/json",
              "x-api-key":
                "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
            },
          }
        )
        .then(async (response) => {
          // navigation.replace("Home Screen");
          navigation.goBack();

          Alert.alert("Success", "Kata Sandi berhasil diubah");

          await axios.get(`${BASE_URL}/cariId/${auth.id}`, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
              "Content-Type": "application/json",
              "x-api-key":
                "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
            },
          });

          setAuth((prevAuth) => ({
            ...prevAuth,
            nama: userGet.data.user.nama,
            tgl_lahir: userGet.data.user.tgl_lahir,
          }));
          console.log(response);
        })
        .catch((error) => {
          if (error.response) {
            // Menangani error yang dikembalikan oleh server
            // const errorMessage =
            //   error.response.data.messages.error || "Unknown error";

            if (error.response.status === 401) {
              // Alert.alert("Perhatian", errorMessage);
              Alert.alert("Perhatian", "Kata Sandi saat ini salah");
            } else {
              Alert.alert(
                "Perhatian",
                "Sesi Login anda telah berakhir mohon lakukan login ulang"
              );
              navigation.replace("Login Screen");
            }
          }
          // Alert.alert("Error", "Password gagal diubah");
          // console.log("Error Update", error);
        });
    } else {
      alert("Kata Sandi Baru Tidak Cocok.");
    }
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyles.utama,
        { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
      ]}>
      <View style={[styles.header]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerText}>Batal</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Kata Sandi Saat Ini</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="Masukan Kata Sandi Saat Ini"
        />

        <Text style={styles.label}>Kata Sandi Baru</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Masukan Kata Sandi Baru"
        />

        <Text style={styles.label}>Konfirmasi Kata Sandi Baru</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Konfirmasi Kata Sandi Baru"
        />

        <Button
          mode="contained"
          onPress={handleChangePassword}
          style={styles.button}>
          Ubah Kata Sandi
        </Button>
        {/* <TouchableOpacity
        onPress={handleChangePassword}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 1,
          padding: 10,
          backgroundColor: "#fff",
          borderColor: "#ddd",
          borderWidth: 1,

          // marginTop: 20,
        }}>
        <Text>Batal</Text>
      </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    color: "#0A78E2",
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    padding: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changePhotoText: {
    color: "#0A78E2",
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  changePasswordContainer: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    padding: 15,
  },
  changePasswordText: {
    color: "#0A78E2",
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#0A78E2",
  },
});

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     marginTop: 20,
//     borderTopWidth: 1,
//     borderTopColor: "#ccc",
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 16,
//   },
//   button: {
//     marginTop: 20,
//     backgroundColor: "#0A78E2",
//   },
// });

export default ChangePasswordForm;
