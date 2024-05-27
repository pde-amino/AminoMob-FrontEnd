import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Button } from "react-native-paper";

const ConfirmModal = ({
  visible,
  onConfirm,
  onCancel,
  message,
  submessage,
  confirmButtonText,
  cancelButtonText,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>{message}</Text>
            <Text style={styles.subtitle}>{submessage}</Text>

            {/* Tombol konfirmasi */}
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                style={styles.btnYes}
                onPress={onConfirm}
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
    width: "80%",
    // height: 250,
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
