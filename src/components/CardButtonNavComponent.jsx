import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import GlobalStyles from "../style/GlobalStyles";
import { TouchableRipple } from "react-native-paper";

const WARNA = { primary: "#0A78E2", white: "#fff" };

const CardButtonNavComponent = ({
  warna,
  title,
  description,
  onPress,
  imgSource,
  alertData,
  modal,
}) => {
  const navigation = useNavigation();
  const handlePress = () => {
    if (onPress) {
      navigation.navigate({
        name: onPress,
        params: { dataString: onPress.data },
      });
      console.log("OnPress Data :", onPress);
    } else {
      Alert.alert(alertData.title, alertData.desc);
    }
  };

  return (
    <TouchableRipple
      style={[styles.button, { backgroundColor: warna }]}
      onPress={modal ? onPress : handlePress}
    >
      <View style={styles.iconContainer}>
        <Image style={styles.img} resizeMode={"cover"} source={imgSource} />
        <View style={styles.textContainer}>
          <Text style={[GlobalStyles.h3, { color: WARNA.white }]}>{title}</Text>
          <Text style={(GlobalStyles.textBiasa, { color: WARNA.white })}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableRipple>
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
  img: {
    height: 100,
    width: 100,
    top: 0,
    right: 10,
  },
});

export default CardButtonNavComponent;
