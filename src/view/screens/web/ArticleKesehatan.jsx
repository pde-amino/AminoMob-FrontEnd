import React from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Card } from "react-native-paper";
import RenderHTML from "react-native-render-html";

const ArticleKesehatan = ({ route = { params: { item: {} } } }) => {
  const { width } = useWindowDimensions();
  const { item } = route.params;
  const year = new Date().getFullYear();
  const article = {
    imageUrl: "https://via.placeholder.com/150",
    title: item.title || "Default Title",
    category: item.category || "Default Category",
    content: item.content || "<p>Default Content</p>",
    copyright: `© ${year} Amino Hospital`,
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={[styles.card, { paddingTop: 5 }]}>
        <Image source={{ uri: article.imageUrl }} style={styles.image} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.category}>{article.category}</Text>
          <RenderHTML contentWidth={width} source={{ html: article.content }} />
          <Text style={styles.copyright}>{article.copyright}</Text>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  card: {
    borderRadius: 10,
    // overflow: "hidden",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: "#888",
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "justify",
  },
  copyright: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginTop: 16,
  },
});

export default ArticleKesehatan;
