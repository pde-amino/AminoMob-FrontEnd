import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";

const ConfirmModal = ({
  visible,
  onConfirm,
  onCancel,
  cancel,
  message,
  submessage,
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
  list,
  listData,
  onData,
  children, // Tambahkan children sebagai prop
  confirm,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemPress = (item) => {
    setSelectedItem(item);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={cancel}>
      <TouchableWithoutFeedback onPress={cancel}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>{message}</Text>
            {submessage && <Text style={styles.subtitle}>{submessage}</Text>}

            {list ? (
              <ScrollView>
                {listData &&
                  listData.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        handleItemPress(item);
                        onData(item);
                      }}>
                      <Text>{item.label}</Text>
                      <Text>{item.value}</Text>
                      <Text>{item.jam_layanan}</Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            ) : (
              // Render children jika disediakan
              <View style={styles.contentContainer}>{children}</View>
            )}

            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                style={styles.btnYes}
                labelStyle={{ color: "white" }}
                onPress={onConfirm}>
                {confirmButtonText}
              </Button>
              <Button
                mode="outlined"
                labelStyle={{ color: "#0A78E2" }}
                style={styles.btnNo}
                onPress={onCancel}>
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
  contentContainer: {
    marginBottom: 20, // Spacing before the buttons
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
    backgroundColor: "#0A78E2",
  },
  btnNo: {
    flex: 1,
    marginRight: 10,
    borderRadius: 10,
    justifyContent: "center",
    borderColor: "#0A78E2",
  },
});

export default ConfirmModal;
