import React, { useState } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
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
    <Modal transparent visible={visible} onRequestClose={onCancel}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{message}</Text>
          <Text style={styles.subtitle}>{submessage}</Text>

          {/* Tombol konfirmasi */}
          <View>
            <Button mode="contained" style={styles.btnYes} onPress={onConfirm}>
              {confirmButtonText}
            </Button>
            <Button mode="outlined" style={styles.btnYes} onPress={onCancel}>
              {cancelButtonText}
            </Button>
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
    height: 300,
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
  // buttonContainer: {
  //   flexDirection: "column",
  //   // justifyContent: "space-between",
  // },
  btnYes: {
    width: 45,
    marginBottom: 8,
    borderRadius: 10,
  },
});

export default ConfirmModal;
