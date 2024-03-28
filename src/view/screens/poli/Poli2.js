import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

const Poli2 = () => {
  const [inputText, setInputText] = useState("");
  const [displayText, setDisplayText] = useState("");

  const handleInputChange = (text) => {
    setInputText(text);
  };

  const handleButtonPress = () => {
    if (inputText.trim() === "") {
      Alert.alert("Error", "Input cannot be empty");
    } else {
      setDisplayText(`Hello, ${inputText}!`);
      setInputText("");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ marginBottom: 20 }}>Enter your name:</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, width: 200 }}
        placeholder="Enter your name"
        value={inputText}
        onChangeText={handleInputChange}
      />
      <Button title="Submit" onPress={handleButtonPress} />
      {displayText !== "" && (
        <Text style={{ marginTop: 20 }}>Response: {displayText}</Text>
      )}
    </View>
  );
};

export default Poli2;
