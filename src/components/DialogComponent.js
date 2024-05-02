// import { StyleSheet } from "react-native";
import { Dialog, Portal } from "react-native-paper";
import React, { useState } from "react";
import { View, Text, Modal, Button, StyleSheet } from "react-native";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "../view/screens/home/HomeScreen";
import BookingScreen from "../view/screens/Verifikasi/BookingScreen";

const SimpleDialog = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);

  // Fungsi untuk membuka dialog
  const openDialog = () => {
    setIsVisible(true);
  };

  // Fungsi untuk menutup dialog
  const closeDialog = () => {
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Tombol untuk membuka dialog */}
      <Button title="Buka Dialog" onPress={openDialog} />

      {/* Modal untuk dialog */}
      <Modal
        transparent={true}
        visible={isVisible}
        onRequestClose={closeDialog}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Data akan disimpan, pastikan data sudah benar
            </Text>
            <View style={{ gap: 10 }}>
              {/* Tombol untuk menutup dialog */}
              <ButtonSecondary title="Cek Lagi" onPress={closeDialog} />
              <ButtonPrimary
                title="Simpan & Booking"
                onPress={() => {
                  navigation.navigate("Booking Screen");
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const DialogComponent = ({
  visible,
  title,
  body,
  hideDialog,
  Cancel,
  Ok,
  onPressCancel,
  onPressOK,
  dismissable,
}) => {
  return (
    <View>
      <SimpleDialog />
    </View>
  );
};

// const styles = StyleSheet.create({
//   title: {
//     textAlign: "center",
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Latar belakang semi-transparan
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 8,
  },
  modalText: {
    marginBottom: 20,
    fontSize: 16,
  },
});

export default DialogComponent;
