import React, { useState } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import TextInputComponent from "../../../components/TextInputComponent";

const TestingScreen = () => {
  // State untuk menyimpan data dari input
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Handler untuk menangani perubahan pada input email
  const handleEmailChange = (input) => {
    setEmail(input);
  };

  // Handler untuk menangani perubahan pada input username
  const handleUsernameChange = (input) => {
    setUsername(input);
  };

  // Handler untuk menangani perubahan pada input password
  const handlePasswordChange = (input) => {
    setPassword(input);
  };

  // Handler untuk menangani aksi saat tombol ditekan
  const handleSubmit = () => {
    // Lakukan sesuatu dengan data yang dikumpulkan
    console.log("Email:", email);
    console.log("Username:", username);
    console.log("Password:", password);
    // Misalnya, Anda bisa menyimpan data ke backend, menampilkan pesan, dll.
  };

  return (
    <View style={styles.container}>
      {/* Menggunakan TextInputComponent untuk input email */}
      <TextInputComponent
        label="Email"
        placeholder="Masukkan email Anda"
        type="email"
        value={email}
        onChangeText={handleEmailChange}
      />

      {/* Menggunakan TextInputComponent untuk input username */}
      <TextInputComponent
        label="Username"
        placeholder="Masukkan username Anda"
        type="username"
        value={username}
        onChangeText={handleUsernameChange}
      />

      {/* Menggunakan TextInputComponent untuk input password */}
      <TextInputComponent
        label="Password"
        placeholder="Masukkan password Anda"
        type="password"
        value={password}
        onChangeText={handlePasswordChange}
      />

      {/* Tombol untuk melakukan submit data */}
      <Button title="Submit" onPress={handleSubmit} />

      {/* Menampilkan data yang diisi pengguna */}
      <Text style={styles.displayText}>
        Email: {email}
        {"\n"}Username: {username}
        {"\n"}Password: {password}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  displayText: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default TestingScreen;
