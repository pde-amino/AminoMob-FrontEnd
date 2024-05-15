import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
const WARNA = { primary: "#0A78E2", white: "#fff" };

const CardButtonComponent = ({
  icon,
  title,
  description,
  onPress,
  imgSource,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Image style={styles.img} resizeMode={"cover"} source={imgSource} />
        {/* <MaterialIcons name={icon} size={24} color={WARNA.primary} /> */}
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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: WARNA.primary,
    padding: 8,
    borderRadius: 20,
    height: 100,
    marginTop: 8,
    width: Dimensions.get("window").width * 0.9,
    elevation: 2,
  },
  iconContainer: {
    flex: 1,
    margin: 8,
    height: 70,
    width: 70,
    backgroundColor: "pink",
    alignItems: "center",
    flexDirection: "row",
  },
  textContainer: {
    flex: 1,
    padding: 4,
    gap: 2,
    backgroundColor: "purple",
  },
  title: {
    fontSize: 18,
    color: WARNA.white,
    fontWeight: "bold",
  },
  description: {
    fontSize: 12,
    color: WARNA.white,
  },
  img: {
    height: 100,
    width: 100,
    top: 0,
    right: 10,
  },
});

export default CardButtonComponent;
