import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React from "react";

export default function TextInputComponent() {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TextInput
        style={[styles.inputan, passwordError && styles.inputError]}
        selectionColor={WARNA.primary}
        placeholder="Password"
        placeholderTextColor={"grey"}
        autoCapitalize="none"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={handlePasswordChange}
        // keyboardType='password'
      />

      {/* icon mata */}
      <View style={{ position: "absolute", right: 10 }}>
        <TouchableOpacity
          style={styles.showHideButton}
          onPress={toggleShowPassword}>
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
