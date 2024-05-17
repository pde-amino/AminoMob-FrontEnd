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
import { useNavigation } from "@react-navigation/native";

const WARNA = { primary: "#0A78E2", white: "#fff" };

const CardButtonNavComponent = ({
  warna,
  title,
  description,
  onPress,
  imgSource,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: warna }]}
      onPress={() =>
        navigation.navigate({
          name: onPress,
          params: { dataString: onPress.data },
        })
      }
    >
      <View style={styles.iconContainer}>
        <Image style={styles.img} resizeMode={"cover"} source={imgSource} />
        {/* <MaterialIcons name={icon} size={24} color={WARNA.white} /> */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: WARNA.primary,
    padding: 8,
    borderRadius: 20,
    marginTop: 8,
    width: Dimensions.get("window").width * 0.9,
    elevation: 2,
  },
  iconContainer: {
    flex: 2,
    margin: 8,
    height: 70,
    width: 70,
    // backgroundColor: "pink",
    alignItems: "center",
    flexDirection: "row",
  },
  textContainer: {
    flex: 1,
    padding: 4,
    gap: 2,
    // backgroundColor: "purple",
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

export default CardButtonNavComponent;
