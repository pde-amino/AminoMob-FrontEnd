import React from "react";
import { Modal, Portal, PaperProvider, Button } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";

const ModalComponent = ({
  visible,
  onDismiss,
  contentContainerStyle,
  children,
  showButtonLabel = "Close",
  showButtonStyle,
}) => {
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    ...contentContainerStyle,
  };

  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={onDismiss}
          contentContainerStyle={containerStyle}>
          {children}
        </Modal>
      </Portal>
      <Button style={{ marginTop: 30, ...showButtonStyle }} onPress={onDismiss}>
        {showButtonLabel}
      </Button>
    </PaperProvider>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});
