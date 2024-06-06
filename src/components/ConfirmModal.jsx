import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
import CardButtonNavComponent from "./CardButtonNavComponent";
import CardButtonComponent from "./CardButtonComponent";

const ConfirmModal = ({
  visible,
  onConfirm,
  onCancel,
  onData,
  message,
  submessage,
  confirmButtonText,
  cancelButtonText,
  list,
  listData,
}) => {
  // State untuk menyimpan item yang dipilih
  const [selectedItem, setSelectedItem] = useState(null);

  // Handler untuk saat item ditekan
  const handleItemPress = (item) => {
    setSelectedItem(item); // Menyimpan item yang dipilih dalam state
  };

  // Handler untuk tombol konfirmasi
  const handleConfirmPress = () => {
    if (selectedItem) {
      // Hanya memanggil onConfirm jika ada item yang dipilih
      if (onConfirm) {
        onConfirm(selectedItem); // Memanggil onConfirm dengan item yang dipilih
      }
    } else {
      // Menampilkan pesan kesalahan jika tidak ada item yang dipilih
      console.warn("Pilih item terlebih dahulu.");
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}>
      {list ? (
        <TouchableWithoutFeedback onPress={onCancel}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>{message}</Text>
              <ScrollView>
                {listData &&
                  listData.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => onData(item)}>
                      <Text>{item.label}</Text>
                      <Text>{item.value}</Text>
                      <Text>{item.jam_layanan}</Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
              {/* <View style={[styles.buttonContainer, { marginTop: 12 }]}>
                <Button
                  mode="contained"
                  style={styles.btnYes}
                  onPress={handleConfirmPress} // Memanggil handleConfirmPress saat tombol ditekan
                >
                  {confirmButtonText}
                </Button>
                <Button mode="outlined" style={styles.btnNo} onPress={onCancel}>
                  {cancelButtonText}
                </Button>
              </View> */}
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback onPress={onCancel}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>{message}</Text>
              <Text style={styles.subtitle}>{submessage}</Text>
              <View style={styles.buttonContainer}>
                <Button
                  mode="contained"
                  style={styles.btnYes}
                  onPress={onConfirm} // Memanggil handleConfirmPress saat tombol ditekan
                >
                  {confirmButtonText}
                </Button>
                <Button mode="outlined" style={styles.btnNo} onPress={onCancel}>
                  {cancelButtonText}
                </Button>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "85%",
    maxHeight: "98%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-around",
  },
  btnYes: {
    flex: 1,
    marginRight: 10,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "blue",
  },
  btnNo: {
    flex: 1,
    marginRight: 10,
    borderRadius: 10,
    justifyContent: "center",
  },
});

export default ConfirmModal;
