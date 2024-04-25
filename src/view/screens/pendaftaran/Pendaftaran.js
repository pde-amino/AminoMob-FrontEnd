import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Modal, Portal } from "react-native-paper";
import ModalComponent from "../../../components/ModalComponent";
import ConfirmModal from "../../../components/ConfirmModal";

export const Pendaftaran = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleConfirm = () => {
    // Lakukan aksi konfirmasi di sini
    setModalVisible(false);
  };

  const handleCancel = () => {
    // Lakukan aksi pembatalan di sini
    setModalVisible(false);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Tambahkan logika pendaftaran di sini
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", marginTop: 30 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Pendaftaran Poli</Text>
        <View>
          <Button
            title="Tampilkan Modal"
            onPress={() => setModalVisible(true)}
          />

          <ConfirmModal
            visible={isModalVisible}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            message="Apakah Anda yakin ingin melanjutkan?"
            confirmButtonText="Ya"
            cancelButtonText="Tidak"
          />
        </View>
        <Button
          title="Daftarkan Untuk Orang Lain"
          onPress={() => navigation.navigate("Login")}
        />
        <TextInput
          style={styles.input}
          placeholder="Nama"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Daftar" onPress={handleRegister} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});
