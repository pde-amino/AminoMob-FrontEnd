import { View, Text } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import GlobalStyles from "../../../style/GlobalStyles";
import { Button } from "react-native-paper";
import DialogComponent from "../../../components/DialogComponent";

export default function DiriSendiri() {
  const [isModalVisible, setModalVisible] = useState(false);

  const [isDialogVisible, setDialogVisible] = useState(false);

  const bukaDialog = () => setDialogVisible(true);

  const [status, setStatus] = React.useState(false);

  const handleConfirm = () => {
    // Lakukan aksi konfirmasi di sini
    navigation.navigate("Pendaftaran");
    setStatus(false);
    // setDialogVisible(false);
    // setDialogVisible(false);
  };

  const handleCancel = () => {
    // Lakukan aksi pembatalan di sini
    setModalVisible(false);
    setDialogVisible(false);
  };

  return (
    <View style={GlobalStyles.Content}>
      <Text>DiriSendiri</Text>
      <DialogComponent
        visible={isDialogVisible}
        title={"Data akan disimpan"}
        body={"Pastikan data sudah benar"}
        Cancel="Belum"
        Ok="Sudah"
        onPressCancel={handleCancel}
        onPressOK={handleConfirm}
      />
      <Button onPress={bukaDialog}>SALD</Button>
    </View>
  );
}
