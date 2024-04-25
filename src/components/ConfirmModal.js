import React, { useState } from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";

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
    <Modal transparent visible={visible} onRequestClose={onCancel}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{message}</Text>
          <Text style={styles.subtitle}>{submessage}</Text>

          {/* Tombol konfirmasi */}
          <View style={styles.buttonContainer}>
            <Button
              style={styles.btnYes}
              title={confirmButtonText}
              onPress={onConfirm}
            />
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
    width: "80%",
    height: 400,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "column",
    // justifyContent: "space-between",
  },
  btnYes: {
    width: "50%",
    marginBottom: 8,
    borderRadius: 10,
  },
});

export default ConfirmModal;
