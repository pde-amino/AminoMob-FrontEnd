import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Banner, Icon } from "react-native-paper";

const BannerComponent = ({
  visible,
  content,
  bannerStyle,
  textStyle,
  colorIcon,
}) => {
  return (
    <View style={[styles.bannerContainer, bannerStyle]}>
      <Banner
        visible={visible}
        icon={() => <Icon source="alert-circle" size={32} color={colorIcon} />}
        style={styles.banner}
      >
        <Text style={[styles.text, textStyle]}>{content}</Text>
      </Banner>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: "#FF8310", // Ensure this matches the desired background color
    borderRadius: 20,
    marginBottom: 12,
  },
  banner: {
    backgroundColor: "transparent", // Ensure banner itself is transparent to show the parent background
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  text: {
    fontWeight: "bold",
    color: "white",
  },
});

export default BannerComponent;
