import axios from "axios";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Modal, Alert } from "react-native";
import { Button } from "react-native-paper";
import { AuthContex } from "../contex/AuthProvider";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../contex/Config";

const AlertFormComponent = ({
  visible,
  onClose,
  onSubmit,
  user,
  token,
  telp,
}) => {
  const [password, setPassword] = useState("");
  const { auth } = useContext(AuthContex);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      await axios.delete(`${BASE_URL}/user/${user}`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
          Authorization: `Bearer ${token}`,
        },
        data: {
          telp: telp,
          password: password,
        },
      });
      await AsyncStorage.removeItem("userInfo");

      Alert.alert("Sukses", "Akun berhasil dihapus", [
        {
          text: "OK",
          onPress: () => {
            navigation.replace("Login Screen");
          },
        },
      ]);
    } catch (error) {
      if (error.response) {
        // Menangani error yang dikembalikan oleh server
        const errorMessage =
          error.response.data.messages.error || "Unknown error";

        if (error.response.status === 401) {
          // Alert.alert("Perhatian", errorMessage);
          Alert.alert(
            "Perhatian",
            "Sesi Login anda telah berakhir mohon lakukan login ulang"
          );
          navigation.replace("Login Screen");
        } else {
          // Menangani error lain yang mungkin terjadi
          Alert.alert("Error", `Terjadi kesalahan: ${errorMessage}`);
        }

        console.log("Error Response Data:", error.response.data);
        console.log("Error Response Status:", error.response.status);
      } else if (error.request) {
        // Jika tidak ada respons dari server
        console.log("No Response Received:", error.request);
        Alert.alert("Peringatan", "Silakan coba lagi nanti.");
      } else {
        // Error lainnya
        console.log("Error Message:", error.message);
        Alert.alert(
          "Peringatan",
          `Terdapat kesalahan data mohon lakukan login ulang`
        );
        navigation.replace("Login Screen");
      }
    } finally {
      return;
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Enter Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}>
              Kirim
            </Button>
            <Button
              textColor="#000000"
              mode="outlined"
              onPress={onClose}
              style={styles.button1}>
              Batal
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertFormComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  openButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#0A78E2",
    borderRadius: 5,
  },
  buttonText: {
    marginLeft: 10,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#0A78E2",
  },
  button1: {
    flex: 1,
    marginHorizontal: 5,
  },
});
