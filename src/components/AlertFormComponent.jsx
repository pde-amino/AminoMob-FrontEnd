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
  title,
  placeholder,
  visible,
  onClose,
  onSubmit,
  onChangeText,
  secure,
}) => {
  const [text, setText] = useState("");
  const { auth } = useContext(AuthContex);
  const navigation = useNavigation();

  const handleOnChangeText = (text) => {
    setText(text);
    onChangeText(text); // Panggil callback untuk mengirim nilai ke parent
  };

  return (
    <Modal
      transparent={true}
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
            <Button mode="contained" onPress={onSubmit} style={styles.button}>
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
