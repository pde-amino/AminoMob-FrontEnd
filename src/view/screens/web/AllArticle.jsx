import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  RefreshControl,
  Alert,
  Image,
  Text,
} from "react-native";
import { Card, TouchableRipple } from "react-native-paper";
import RenderHTML from "react-native-render-html";
import CardComponentArticel from "../../../components/CardComponentArticel";
import axios from "axios";
import GlobalStyles from "../../../style/GlobalStyles";
import HeaderComponent from "../../../components/HeaderComponent";
import { useNavigation } from "@react-navigation/native";
import { BASE_ARTICLE } from "../../../contex/Config";

const Item = ({ item, onPress }) => (
  <TouchableRipple style={{ backgroundColor: "red" }}>
    <Text>INI CEK ITEM</Text>
    {/* <Image
      source={{ uri: item.link_image }}
      style={{ resizeMode: "contain" }}
    /> */}
    <View>
      <Text>{item.title}</Text>
      <Text>{item.title}</Text>
      <Text>{item.title}</Text>s
    </View>
  </TouchableRipple>
);

const AllArticle = () => {
  const { width } = useWindowDimensions();
  const [refreshing, setRefreshing] = useState(false);
  const year = new Date().getFullYear();
  const navigation = useNavigation();
  const [articles, setArticles] = useState("");
  const [loading, setLoading] = useState("");

  const fetchArticles = async () => {
    try {
      const response = await axios.get(BASE_ARTICLE);
      setArticles(response.data);
      setLoading(false);
    } catch (error) {
      Alert.alert(
        "Maaf",
        "Ada kesalahan saat mengambil data artikel, mohon ulangi beberapa saat lagi"
      );
      setLoading(false);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const renderArticleItem = ({ item }) => (
    <CardComponentArticel
      imgSource={{ uri: item.image }}
      title={item.title}
      description={item.content}
      shortDesc={item.shortDesc}
      data={{ item }}
    />
  );

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        // onPress={() => {
        //   setPilihPasien(item);
        //   navigation.navigate(
        //     "LayananNonBPJS",
        //     item
        //     // (selectedItem = item)
        //   );
        // }}
      />
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchArticles();
  };

  return (
    <View style={GlobalStyles.utama}>
      <View>
        <HeaderComponent
          title={"Artikel"}
          icon={"arrow-back"}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <FlatList
          // horizontal={false}
          numColumns={3}
          data={articles}
          // renderItem={renderItem}
          renderItem={renderArticleItem}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
