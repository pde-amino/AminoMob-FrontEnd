import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Modal, Portal } from "react-native-paper";
import ModalComponent from "../../../components/ModalComponent";
import ConfirmModal from "../../../components/ConfirmModal";
import TextInputIconComponent from "../../../components/TextInputIconComponent";
import ButtonPrimary from "../../../components/ButtonPrimary";
import GlobalStyles from "../../../style/GlobalStyles";

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
      <ScrollView>
        <View style={GlobalStyles.Content}>
          <Text style={styles.judul}>Pendaftaran Poli</Text>
          {/* <View style={GlobalStyles.textCenter}>
            <Text>Ini adalah data dari Profile Anda</Text>
            <Text>
              Jika masih ada kekliruan mohon perbaiki dahulu melalui menu
              Profile
            </Text>
          </View> */}
          <TextInputIconComponent
            label={"No Rekam Medis"}
            placeholder={"Masukan No Rekam Medis Anda"}
            type={"username"}
          />
          <TextInputIconComponent
            label={"Nama Lengkap"}
            placeholder={"Masukan Nama Lengkap Anda"}
            type={"username"}
          />
          <TextInputIconComponent
            label={"Alamat"}
            placeholder={"Masukan Alamat Lengkap Anda"}
            type={"username"}
          />
          <TextInputIconComponent
            label={"Jns Kelamin"}
            placeholder={"Gender"}
            type={"username"}
          />
          <TextInputIconComponent
            label={"Tgl Lahir"}
            placeholder={"Masukan Alamat Lengkap Anda"}
            type={"username"}
          />
          <TextInputIconComponent
            label={"No Handphone"}
            placeholder={"081222931283"}
            type={"username"}
          />
          <Text>Pastikan data anda sudah benar</Text>
          <ButtonPrimary title="Selanjutnya -->" onPress={handleRegister} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  judul: {
    fontSize: 24,
    fontWeight: "bold",
    // marginBottom: 20,
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
