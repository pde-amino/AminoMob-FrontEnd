import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";

const DisplayPhoto = ({ route, navigation }) => {
  const { photoUri } = route.params;
  const [displayUri, setDisplayUri] = useState(null);

  useEffect(() => {
    setDisplayUri(photoUri);
  }, []);

  return (
    <View style={styles.container}>
      {displayUri && (
        <Image source={{ uri: displayUri }} style={styles.image} />
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Ulangi Foto</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Gunakan Foto ini</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
  button: {
    padding: 10,
    backgroundColor: "#000",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default DisplayPhoto;
