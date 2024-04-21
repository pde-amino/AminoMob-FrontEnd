import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CardButtonComponent = ({ icon, title, description, onPress }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() =>
        navigation.navigate({
          name: onPress,
          params: { dataString: onPress.data },
        })
      }
    >
      <View style={styles.iconContainer}>
        <MaterialIcons name={icon} size={24} color="white" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6200ea",
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    width: 350,
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "white",
  },
});

export default CardButtonComponent;
