import React, { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";

const GetIPButton = () => {
  const [ipAddress, setIpAddress] = useState("");

  const getIP = async () => {
    try {
      const state = await NetInfo.fetch();
      const ipLocal = state.details.ipAddress;
      setIpAddress(ipLocal);
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Button title="Get IP Address" onPress={getIP} />
      {ipAddress ? <Text>IP Address: {ipAddress}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GetIPButton;
