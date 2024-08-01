import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Linking,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import GlobalStyles from "../../../style/GlobalStyles";
import Svg, { Path } from "react-native-svg";
import MySlider from "../../../components/MySlider";
import CardButtonComponent from "../../../components/CardButtonComponent";
import axios from "axios";
import { AuthContex } from "../../../contex/AuthProvider";
import CardComponentArticel from "../../../components/CardComponentArticel";
import { Icon, TouchableRipple } from "react-native-paper";
import { BASE_ARTICLE } from "../../../contex/Config";

const WARNA = { primary: "#0A78E2", white: "#fff" };

const HomeScreen = () => {
  const { logout, auth } = useContext(AuthContex);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const onRefresh = () => {
    setRefreshing(true);
    fetchArticles();
    setRefreshing(false);
  };

  const alertMJKN = () => {
    Alert.alert(
      "Maaf",
      "Saat ini pendaftaran Layanan BPJS hanya bisa menggunakan aplikasi Mobile JKN",
      [{ text: "OK", onPress: () => checkAndOpenApp() }]
    );
  };

  const checkAndOpenApp = async () => {
    const packageName = "app.bpjs.mobile";
    const appLink = `intent://${packageName}#Intent;scheme=package;end`;
    const playStoreLink = `https://play.google.com/store/apps/details?id=${packageName}`;

    try {
      await Linking.openURL(appLink);
    } catch (error) {
      Linking.openURL(playStoreLink);
    }
  };

  const Menus = [
    {
      kd_poli: "1",
      source: require("../../../../assets/icon31.png"),
      title: "Layanan RS (Non BPJS)",
      desc: "Pendaftaran layanan kesehatan khusus untuk pasien Non BPJS",
      to: () => navigation.navigate("List Pasien"),
      warna: WARNA.primary,
    },
    {
      kd_poli: "2",
      source: require("../../../../assets/icon32.png"),
      title: "Layanan RS (BPJS)",
      desc: "Pendaftaran layanan kesehatan khusus untuk pasien BPJS",
      to: () => alertMJKN(),
      warna: WARNA.primary,
    },
    {
      kd_poli: "3",
      source: require("../../../../assets/icon33.png"),
      title: "Informasi Umum RS",
      desc: "Informasi terkini dan terlengkap seputar Amino Hospital",
      to: () => navigation.navigate("Informasi Umum"),
      warna: WARNA.primary,
    },
  ];

  const getArticles = async () => {
    try {
      const response = await axios.get(BASE_ARTICLE);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const fetchArticles = async () => {
    try {
      const articlesData = await getArticles();
      setArticles(articlesData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const renderArticleItem = ({ item }) => (
    <CardComponentArticel
      imgSource={{ uri: item.image_url }}
      title={item.title}
      description={item.content}
      data={{ item }}
    />
  );

  const darurat = () => {
    Linking.openURL("https://wa.me/6281225204301");
  };

  const ListHeaderComponent = () => (
    <View>
      <View style={{ alignItems: "center" }}>
        <View style={GlobalStyles.headerHomeContainer}>
          <Image
            source={require("../../../../assets/logo-app.png")}
            resizeMode="contain"
            style={GlobalStyles.containerLogo}
          />
          <TouchableOpacity style={GlobalStyles.btnRedSmall} onPress={darurat}>
            <Text style={GlobalStyles.textButtonSmall}>IGD AMINO</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ width: wp(100) }}>
        <MySlider />
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <Text style={GlobalStyles.h3}>Menu</Text>
      </View>
    </View>
  );

  const showAllArticle = () => (
    <TouchableRipple onPress={() => navigation.navigate("AllArticle")}>
      <View style={styles.containerNext}>
        <Text style={GlobalStyles.textBiasa}>Artikel Lainnya</Text>
        <Icon size={32} source={"arrow-right-circle"} color="#3e3e3e" />
      </View>
    </TouchableRipple>
  );
  const emptyArtikel = useCallback(
    () => (
      <View
        style={{
          paddingLeft: 20,
          marginTop: 20,
        }}>
        <Text style={GlobalStyles.textBiasa}>
          Maaf, belum ada artikel tersedia
        </Text>
      </View>
    ),
    []
  );

  const ListFooterComponent = () => (
    <>
      {articles.length === 0 ? (
        <View style={styles.containerNext}>
          <Text style={GlobalStyles.textBiasa}>AMINO HOSPITAL</Text>
        </View>
      ) : (
        <>
          <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
            <Text style={GlobalStyles.h3}>Artikel</Text>
          </View>

          <FlatList
            data={articles}
            ListFooterComponent={
              articles && articles.length ? showAllArticle : null
            }
            renderItem={renderArticleItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={emptyArtikel}
          />
        </>
      )}
    </>
  );

  const renderEmptyComponent = () => (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text style={GlobalStyles.textBiasa}>No data available</Text>
    </View>
  );

  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <View style={styles.containerSVG}>
        <Svg height={hp(45)} width={wp(100)} viewBox="0 0 1440 320">
          <Path
            fill="#0a78e2"
            fillOpacity="1" // Ubah menjadi fillOpacity karena properti fillOpacity
            d="M0,288L48,256C96,224,192,160,288,160C384,160,480,224,576,256C672,288,768,288,864,261.3C960,235,1056,181,1152,144C1248,107,1344,85,1392,74.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></Path>
        </Svg>
      </View>

      <View style={{ alignContent: "center", marginTop: wp(8) }}>
        <FlatList
          data={Menus}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <CardButtonComponent
                data={{ clinicId: item.kd_poli, nameClinic: item.desc }}
                icon={item.icon}
                title={item.title}
                description={item.desc}
                onPress={item.to}
                colorIcon={item.color}
                imgSource={item.source}
                warna={item.warna}
                alertData={item.alert}
              />
            </View>
          )}
          keyExtractor={(item) => item.kd_poli.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={renderEmptyComponent}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerSVG: {
    backgroundColor: WARNA.primary,
    height: 150,
    width: "100%",
    position: "absolute",
  },
  containerNext: {
    width: wp(40),
    height: wp(50),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    gap: 8,
  },
});

export default HomeScreen;
