import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";

const Poli1 = () => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    // Lakukan sesuatu dengan nilai input, misalnya kirim ke server
    Alert.alert("Input Value", inputValue);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: "80%" }}
        placeholder="Enter something..."
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default Poli1;
