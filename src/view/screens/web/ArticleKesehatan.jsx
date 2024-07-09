import { yearsToDays } from "date-fns";
import React from "react";
import { View, ScrollView, Text, Image, StyleSheet } from "react-native";
import { Card } from "react-native-paper";

const ArticleKesehatan = () => {
  //   const dateUpload = new Date();
  const year = new Date().getFullYear();
  const article = {
    imageUrl: "https://via.placeholder.com/150", // Ganti dengan URL gambar utama
    title: "Judul Artikel",
    category: "Kategori Artikel",
    // publishDate: { dateUpload },
    content: `Ini adalah isi artikel. Artikel ini berisi informasi yang sangat menarik dan bermanfaat bagi pembaca. 
Anda dapat menambahkan teks lebih banyak lagi sesuai dengan konten artikel yang Anda miliki.
    Ini adalah isi artikel. Artikel ini berisi informasi yang sangat menarik dan bermanfaat bagi pembaca. 
Anda dapat menambahkan teks lebih banyak lagi sesuai dengan konten artikel yang Anda miliki.
Ini adalah isi artikel. Artikel ini berisi informasi yang sangat menarik dan bermanfaat bagi pembaca. 
    Anda dapat menambahkan teks lebih banyak lagi sesuai dengan konten artikel yang Anda miliki.
    Ini adalah isi artikel. Artikel ini berisi informasi yang sangat menarik dan bermanfaat bagi pembaca. 
              Anda dapat menambahkan teks lebih banyak lagi sesuai dengan konten artikel yang Anda miliki.
    Ini adalah isi artikel. Artikel ini berisi informasi yang sangat menarik dan bermanfaat bagi pembaca. 
    Anda dapat menambahkan teks lebih banyak lagi sesuai dengan konten artikel yang Anda miliki.
    Ini adalah isi artikel. Artikel ini berisi informasi yang sangat menarik dan bermanfaat bagi pembaca. 
              Anda dapat menambahkan teks lebih banyak lagi sesuai dengan konten artikel yang Anda miliki.
    Ini adalah isi artikel. Artikel ini berisi informasi yang sangat menarik dan bermanfaat bagi pembaca. 
              Anda dapat menambahkan teks lebih banyak lagi sesuai dengan konten artikel yang Anda miliki.
    Ini adalah isi artikel. Artikel ini berisi informasi yang sangat menarik dan bermanfaat bagi pembaca. 
              Anda dapat menambahkan teks lebih banyak lagi sesuai dengan konten artikel yang Anda miliki.
              `,
    copyright: `© ${year} Amino Hospital`,
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={[styles.card, { paddingTop: 5 }]}>
        <Image source={{ uri: article.imageUrl }} style={styles.image} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.category}>{article.category}</Text>
          {/* <Text style={styles.category}>{article.publishDate}</Text> */}
          <Text style={styles.content}>{article.content}</Text>
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
    padding: 16,
  },
  card: {
    borderRadius: 10,
    overflow: "hidden",
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
  },
  copyright: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginTop: 16,
  },
});

export default ArticleKesehatan;
