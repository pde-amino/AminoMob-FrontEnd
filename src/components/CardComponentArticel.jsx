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
import { Card } from "react-native-paper";
import RenderHTML from "react-native-render-html";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const CardComponentArticle = ({ imgSource, title, description, data }) => {
  const [readMore, setReadMore] = useState(false);
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Article", data)}>
      <Card style={styles.card}>
        <Image source={imgSource} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <RenderHTML
            contentWidth={width}
            source={{
              html: readMore ? description : `${description.slice(0, 50)}...`,
            }}
          />
          <TouchableOpacity onPress={() => setReadMore(!readMore)}>
            <Text style={styles.readMore}>
              {readMore ? "Read less" : "Read more"}
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: wp(40),
    height: wp(55),
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

export default CardComponentArticle;
