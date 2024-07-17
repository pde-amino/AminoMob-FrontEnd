import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Card, TouchableRipple } from "react-native-paper";
import RenderHTML from "react-native-render-html";
import { widthPercentageToDP } from "react-native-responsive-screen";

const CardComponentArticel = ({ imgSource, title, description, data }) => {
  const { width } = useWindowDimensions();
  const [readMore, setReadMore] = useState(false);
  const navigation = useNavigation();
  console.log("testing image", data.item);

  return (
    <TouchableRipple onPress={() => navigation.navigate("Article", data)}>
      <Card style={styles.card}>
        <Image source={{ uri: data.item.image_url }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>
            {/* <RenderHTML
              contentWidth={width}
              source={{
                html: data.item.shortDesc,
              }}
            /> */}
            {/* {data.item.shortDesc} */}
            {readMore
              ? data.item.shortDesc
              : `${data.item.shortDesc.slice(0, 50)}... `}
            <TouchableOpacity onPress={() => setReadMore(!readMore)}>
              {/* <Text style={styles.readMore}>
                {readMore ? "Read less" : "Read more"}
              </Text> */}
            </TouchableOpacity>
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
    margin: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "50%",
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "gray",
  },
  readMore: {
    color: "blue",
    marginTop: 5,
  },
});

export default CardComponentArticel;
