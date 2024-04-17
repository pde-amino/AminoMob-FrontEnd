import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";

const RegistrationScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registeredData, setRegisteredData] = useState(null);

  const handleRegistration = () => {
    // Handle Get Data
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    // Menyimpan data yang diinput pengguna
    setRegisteredData({ name, email, password });
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleRegistration}
        style={styles.button}>
        Register
      </Button>
      {/* Menampilkan data yang diinput pengguna */}
      {registeredData && (
        <View style={styles.registeredData}>
          <Text>Name: {registeredData.name}</Text>
          <Text>Email: {registeredData.email}</Text>
          <Text>Password: {registeredData.password}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 10,
    width: "100%",
  },
  button: {
    width: "100%",
    marginTop: 10,
  },
  registeredData: {
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default RegistrationScreen;
