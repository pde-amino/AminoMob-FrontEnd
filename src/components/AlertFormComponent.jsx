import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, Modal } from "react-native";
import { Button } from "react-native-paper";
import { AuthContex } from "../contex/AuthProvider";

const AlertFormComponent = ({
  title,
  placeholder,
  visible,
  onClose,
  onSubmit,
  onChangeText,
  secure = false, // Default value added for secure prop
}) => {
  const [text, setText] = useState("");
  const { auth } = useContext(AuthContex);

  const handleOnChangeText = (text) => {
    setText(text);
    if (onChangeText) {
      onChangeText(text); // Panggil callback jika disediakan oleh parent
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(text); // Kirim teks ke parent saat submit
    }
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={secure}
            placeholder={placeholder}
            value={text}
            onChangeText={handleOnChangeText}
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

const styles = StyleSheet.create({
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
    textAlign: "center",
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
    borderRadius: 5,
  },
  button1: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});

export default AlertFormComponent;
