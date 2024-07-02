import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { widthPercentageToDP } from "react-native-responsive-screen";

const CardComponentArticel = ({ imgSource, title, description }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <Card style={styles.card}>
      <Image source={imgSource} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>
          {readMore ? description : `${description.slice(0, 50)}... `}
          <TouchableOpacity onPress={() => setReadMore(!readMore)}>
            <Text style={styles.readMore}>
              {readMore ? "Read less" : "Read more"}
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: widthPercentageToDP(50),
    height: widthPercentageToDP(45),
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
