import React, { useState } from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";

const ConfirmModal = ({
  visible,
  onConfirm,
  onCancel,
  message,
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
}) => {
  return (
    <Modal transparent visible={visible} onRequestClose={onCancel}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.message}>{message}</Text>

          {/* Tombol konfirmasi */}
          <View style={styles.buttonContainer}>
            <Button title={confirmButtonText} onPress={onConfirm} />
            <Button title={cancelButtonText} onPress={onCancel} />
          </View>
        </View>
      </View>
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
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ConfirmModal;
