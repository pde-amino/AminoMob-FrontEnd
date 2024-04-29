import * as React from "react";
import { StyleSheet } from "react-native";
import { Dialog, Portal, Text, Button } from "react-native-paper";

const DialogComponent = ({
  visible,
  title,
  body,
  hideDialog,
  Cancel,
  Ok,
  onPressCancel,
  onPressOK,
  dismissable = "true",
}) => {
  return (
    <Portal>
      <Dialog
        // theme={{ colors: { primary: "green" } }}
        dismissable={dismissable}
        dismissableBackButton="true"
        visible={visible}
        onDismiss={hideDialog}
      >
        <Dialog.Icon icon="alert" />
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{body}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onPressCancel} style={{ color: "blue" }}>
            {Cancel}
          </Button>
          <Button onPress={onPressOK}>{Ok}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});

export default DialogComponent;
