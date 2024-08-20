import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Card, TouchableRipple } from "react-native-paper";
import RenderHTML from "react-native-render-html";
import { View, Text, Image, StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import GlobalStyles from "../style/GlobalStyles";

const CardComponentArticel = ({ imgSource, title, description, data }) => {
  const [readMore, setReadMore] = useState(false);
  const navigation = useNavigation();

  return (
    <TouchableRipple onPress={() => navigation.navigate("Article", data)}>
      <Card style={styles.card}>
        <Image source={{ uri: data.item.image_url }} style={styles.image} />
        <View style={styles.content}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={GlobalStyles.h4}>
            {title}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={GlobalStyles.textBiasa}
          >
            {data.item.shortDesc}
          </Text>
        </View>
      </Card>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  card: {
    width: widthPercentageToDP(40),
    height: widthPercentageToDP(50),
    margin: 8,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "50%",
  },
  content: {
    padding: 10,
    gap: 4,
  },
});

export default CardComponentArticel;
