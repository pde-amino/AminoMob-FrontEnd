import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import GlobalStyles from "../style/GlobalStyles";

const WARNA = { primary: "#0A78E2", white: "#fff" };

const CardButtonComponent = ({
  warna,
  title,
  description,
  onPress,
  imgSource,
}) => {
  return (
    <View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: warna }]}
        onPress={onPress}
      >
        <View style={styles.iconContainer}>
          <Image style={styles.img} resizeMode={"cover"} source={imgSource} />

          <View style={styles.textContainer}>
            <Text
              style={[
                GlobalStyles.h2,
                { color: WARNA.white, fontWeight: "bold" },
              ]}
            >
              {title}
            </Text>
            <Text style={[GlobalStyles.textBiasa, { color: WARNA.white }]}>
              {description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
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
    height: 100,
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
    gap: 10,
    maxWidth: "65%",
    // backgroundColor: "purple",
  },
  img: {
    height: 100,
    width: 100,
    top: 0,
    right: 10,
  },
});

export default CardButtonComponent;
