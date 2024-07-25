import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Alert,
} from "react-native";
import { Card } from "react-native-paper";
import RenderHTML from "react-native-render-html";
import CardComponentArticel from "../../../components/CardComponentArticel";
import axios from "axios";
import GlobalStyles from "../../../style/GlobalStyles";
import { RefreshControl } from "react-native-gesture-handler";
import HeaderComponent from "../../../components/HeaderComponent";
import { useNavigation } from "@react-navigation/native";

const AllArticle = () => {
  const { width } = useWindowDimensions();
  //   const { item } = route.params;
  const year = new Date().getFullYear();

  const navigation = useNavigation();

  const [articles, setArticles] = useState("");
  const [loading, setLoading] = useState("");
  //   const article = {
  //     imageUrl: item.image_url || "https://via.placeholder.com/150",
  //     title: item.title || "Default Title",
  //     category: item.category || "Default Category",
  //     content: item.content || "Default Content",
  //     copyright: `© ${year} Amino Hospital`,
  //   };

  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://192.168.5.3:8000/api/articles");
      setArticles(response.data); // Set state articles dengan data dari respons
      setLoading(false);
    } catch (error) {
      Alert.alert(
        "Maaf",
        "Ada kesalahan saat mengambil data artikel, mohon ulangi beberapa saat lagi"
      );

      setLoading(false); // Set loading menjadi false jika terjadi error
    }
  };

  useEffect(() => {
    fetchArticles(); // Panggil fungsi fetchArticles saat komponen dimuat
  }, []);

  const renderArticleItem = ({ item }) => (
    <CardComponentArticel // Pastikan penulisan CardComponentArticle sesuai dengan nama yang benar
      imgSource={{ uri: item.image_url }} // Sesuaikan dengan data artikel yang sesungguhnya
      title={item.title}
      description={item.content}
      data={{ item }}
    />
  );

  return (
    <View style={GlobalStyles.utama}>
      <View>
        <HeaderComponent
          title={"Artikel"}
          icon={"arrow-back"}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={[GlobalStyles.safeAreaStyle, { alignItems: "center" }]}>
        <FlatList
          horizontal={false}
          numColumns={2}
          data={articles}
          renderItem={renderArticleItem}
          keyExtractor={(item) => item.id}
          // onRefresh={<RefreshControl refreshing={loading} />}
        />
      </View>
    </View>
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

export default AllArticle;
