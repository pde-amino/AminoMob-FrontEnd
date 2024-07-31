import React from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import RenderHTML from "react-native-render-html";
import GlobalStyles from "../../../style/GlobalStyles";
import HeaderComponent from "../../../components/HeaderComponent";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const tagsStyles = {
  p: {
    fontSize: hp(1.8),
    textAlign: "justify",
    backgroundColor: "none",
  },
  li: {
    fontSize: hp(1.8),
    textAlign: "justify",
    backgroundColor: "none",
  },
  h3: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#3E3E3E",
  },
};

const classesStyles = {
  customClass: {
    fontSize: 20,
    color: "purple",
  },
};

const ArticleKesehatan = ({ route = { params: { item: {} } } }) => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const { item } = route.params;
  const year = new Date().getFullYear();
  const copyright = `© ${year} Amino Hospital`;

  return (
    <>
      <HeaderComponent
        // title={article.title}
        icon={"arrow-back"}
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        <Image source={{ uri: item.image_url }} style={styles.image} />

        <Text style={[GlobalStyles.h1, { marginBottom: 8 }]}>{item.title}</Text>
        <Text style={[GlobalStyles.h4, { fontWeight: "normal" }]}>
          {item.category}
        </Text>
        <RenderHTML
          tagsStyles={tagsStyles}
          classesStyles={classesStyles}
          contentWidth={width}
          source={{ html: item.content }}
        />

        <Text>Dipublikasi pada : {item.created_at}</Text>
        <Text style={styles.copyright}>{copyright}</Text>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 20,
  },
  copyright: {
    fontSize: hp(1.6),
    color: "#888",
    textAlign: "center",
    paddingTop: 100,
    justifyContent: "flex-end",
  },
});

export default ArticleKesehatan;
