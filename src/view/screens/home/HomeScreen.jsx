import React, { useContext, useEffect, useState } from "react";
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
  widthPercentageToDP,
} from "react-native-responsive-screen";
import GlobalStyles from "../../../style/GlobalStyles";
import Svg, { Path } from "react-native-svg";
import MySlider from "../../../components/MySlider";
import CardButtonComponent from "../../../components/CardButtonComponent";
import axios from "axios";
import { AuthContex } from "../../../contex/AuthProvider";
import CardComponentArticel from "../../../components/CardComponentArticel";
import { Button } from "react-native-paper";

const WARNA = { primary: "#0A78E2", white: "#fff" };

const HomeScreen = () => {
  const { logout, auth } = useContext(AuthContex); // Pastikan penulisan AuthContex sesuai dengan nama yang benar
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // Tambahkan state loading

  const onRefresh = () => {
    setRefreshing(true);
    fetchArticles(); // Panggil kembali fungsi fetchArticles saat refresh
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
      const response = await axios.get("http://192.168.5.3:8000/api/articles");
      return response.data; // Mengembalikan data dari respons
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error; // Melempar error agar dapat ditangani di tempat lain
    }
  };

  const fetchArticles = async () => {
    try {
      const articlesData = await getArticles();
      setArticles(articlesData);
      setLoading(false); // Setelah selesai loading, set loading menjadi false
      console.log("Get Article", articlesData);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setLoading(false); // Set loading menjadi false jika terjadi error
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "http://192.168.5.3:8000/api/articles"
        );
        setArticles(response.data); // Set state articles dengan data dari respons
        setLoading(false);
        console.log("fetch data article", response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false); // Set loading menjadi false jika terjadi error
      }
    };

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

  const darurat = () => {
    Linking.openURL("https://wa.me/6281225204301");
  };

  const ListHeaderComponent = () => (
    <View style={GlobalStyles.safeAreaStyle}>
      <View style={{ flex: 1, alignItems: "center" }}>
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

      <View style={{ flex: 4, width: wp(100) }}>
        <MySlider />
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <Text style={GlobalStyles.h3}>Menu</Text>
      </View>
    </View>
  );

  const showAllArticle = () => (
    <TouchableOpacity onPress={() => navigation.navigate("AllArticle")}>
      {console.log("testingsasdas :")}
      <View
        style={[
          // (height = widthPercentageToDP(20)),
          {
            height: widthPercentageToDP(50),
            width: widthPercentageToDP(40),
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "black",
            // borderBlockColor: "black",
            // borderWidth: 1,
            // borderRadius: 8,
          },
        ]}>
        <Text>{"Lihat Lebih Banyak Artikel".slice(0, 50)}...</Text>
      </View>
    </TouchableOpacity>
  );

  const ListFooterComponent = () => (
    <>
      <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
        <Text style={GlobalStyles.h3}>Artikel</Text>
      </View>
      <FlatList
        data={articles}
        ListFooterComponent={showAllArticle()}
        renderItem={renderArticleItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );

  const renderEmptyComponent = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
            d="M0,288L48,256C96,224,192,160,288,160C384,160,480,224,576,256C672,288,768,288,864,261.3C960,235,1056,181,1152,144C1248,107,1344,85,1392,74.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></Path>
        </Svg>
      </View>

      <View style={{ alignContent: "center", marginTop: wp(8) }}>
        <FlatList
          data={Menus}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
          showsVerticalScrollIndicator={false}
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
    width: wp(100),
    position: "absolute",
  },
});

export default HomeScreen;
