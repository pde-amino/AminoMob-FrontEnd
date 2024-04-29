import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const WARNA = { primary: "#0A78E2", white: "#fff" };

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
      }>
      <View style={styles.iconContainer}>
        <MaterialIcons name={icon} size={24} color={WARNA.primary} />
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
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
    width: 370,
    elevation: 5,
    shadowColor: WARNA.primary,
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: WARNA.primary,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "grey",
  },
});

export default CardButtonComponent;
