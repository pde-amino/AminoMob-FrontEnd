// import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import { Button } from "react-native-paper";

const EditProfileForm = ({ onSave }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSave = () => {
    const updatedProfile = { name, email, phone };
    onSave(updatedProfile);
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
      ]}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />

      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
      />

      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#0A78E2",
  },
});

export default EditProfileForm;
