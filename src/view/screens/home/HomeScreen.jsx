import React, { useState, useEffect, useContext } from "react";
import {
  View,
  FlatList,
  Text,
  RefreshControl,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Image,
  Linking,
  Alert,
} from "react-native";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import MenuItemComponent from "../../../components/MenuItemComponent";
import LoadingContent from "../../../components/LoadingContent";
import CardButtonNavComponent from "../../../components/CardButtonNavComponent";
import SliderComponent from "../../../components/SliderComponent ";
import MySlider from "../../../components/MySlider";
import GlobalStyles from "../../../style/GlobalStyles";
import BottomSheet from "../../../components/BottomSheet";
import ConfirmModal from "../../../components/ConfirmModal";
import { AuthContex } from "../../../contex/AuthProvider";
import Svg, { Path } from "react-native-svg";
import BannerComponent from "../../../components/BannerComponent";
import { SpeedDial } from "@rneui/themed";
import axios from "axios";
import { BASE_URL } from "../../../contex/Config";
import { useCallback } from "react";

// const { lebar } = Dimensions.get("screen");
const WARNA = { primary: "#0A78E2", white: "#fff" };

const HomeScreen = () => {
  const { auth } = useContext(AuthContex);
  console.log("Ini dari HomeScreen :", auth);
  // const route = useRoute();
  // const { data } = route.params;
  // console.log("result", { route });
  // const { result } = route.params;

  // const handleLogout = async () => {
  //   try {
  //     await AsyncStorage.removeItem("userInfo");
  //     logout();
  //     navigation.navigate("Login Screen");
  //     Alert.alert("Logout", "Anda telah berhasil logout.");
  //   } catch (error) {
  //     Alert.alert("Error", "Logout gagal. Silakan coba lagi.");
  //     console.error("Error removing userInfo from AsyncStorage", error);
  //   }
  // };

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/cariId/${auth.user.id}`, {
  //       headers: {
  //         Authorization: `Bearer ${auth.user.token}`,
  //       },
  //     });
  //     setDataUser(response.data.user);
  //     console.log("Fetch Response data:", response.data);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error.message);
  //     console.error("Error response data:", error);
  //     if (error.message === "Request failed with status code 401") {
  //       handleLogout();
  //     }
  //   }
  // };

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchData();
  //   }, [])
  // );

  //   Linking.canOpenURL(url)
  //     .then((supported) => {
  //       if (!supported) {
  //         Alert.alert("WhatsApp is not installed on your device");
  //       } else {
  //         return Linking.openURL(url);
  //       }
  //     })
  //     .catch((err) => console.error("An error occurred", err));
  // };

  const Menus = [
    {
      kd_poli: "1",
      source: require("../../../../assets/icon31.png"),
      title: "Layanan RS (Non BPJS)",
      desc: "Pendaftaran layanan kesehatan khusus untuk pasien Non BPJS",
      to: "List Pasien",
      warna: WARNA.primary,
      kondisi: false,
    },
    {
      kd_poli: "2",
      source: require("../../../../assets/icon32.png"),
      title: "Layanan RS (BPJS)",
      desc: "Pendaftaran layanan kesehatan khusus untuk pasien BPJS",
      // belumAda: true,
      to: false,
      alert: {
        title: "Mohon Maaf",
        desc: "Saat ini pendaftaran Layanan RS BPJS hanya bisa menggunakan aplikasi Mobile JKN",
      },
      warna: WARNA.primary,
    },
    {
      kd_poli: "3",
      source: require("../../../../assets/icon33.png"),
      title: "Informasi Umum RS",
      desc: "Informasi terkini dan terlengkap seputar Amino Hospital",
      to: "Informasi Umum",
      // params: { clinicId: 1, nameClinic: "Klinik Umum" }, // Parameter yang disertakan (misalnya clinicId)
      warna: WARNA.primary,
    },
  ];

  const navigation = useNavigation();
  const [poliklinikData, setPoliklinikData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [open, setOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);

  const darurat = () => {
    Linking.openURL("https://wa.me/6281225204301");
  };

  // useEffect(() => {
  //   if (auth.status === "Belum") {
  //     setBannerVisible(true);
  //   } else {
  //     setBannerVisible(false);
  //   }
  // }, [auth.status]);

  // const handleKondisi = (item) => {
  //   if (item.kondisi) {
  //     // Lakukan sesuatu jika kondisi terpenuhi
  //     setModalVisible(true);
  //     console.log("Lebar layar:", Dimensions.get("window").width);
  //   } else {
  //     // Navigasi ke screen lain berdasarkan nilai 'to' dari item
  //     navigation.navigate(item.to);
  //   }
  // };

  const [kondisi, setKondisi] = React.useState(false);

  // const phoneNumber = "6281225204301";
  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <View
          style={{
            backgroundColor: WARNA.primary,
            height: 150,
            width: "100%",
            position: "absolute",
          }}>
          <Svg height={hp(45)} width={wp(100)} viewBox="0 0 1440 320">
            <Path
              fill="#0a78e2"
              fill-opacity="1"
              d="M0,288L48,256C96,224,192,160,288,160C384,160,480,224,576,256C672,288,768,288,864,261.3C960,235,1056,181,1152,144C1248,107,1344,85,1392,74.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></Path>
          </Svg>
        </View>
        <View style={{ marginVertical: 50 }}>
          <View style={GlobalStyles.headerHomeContainer}>
            <Image
              source={require("../../../../assets/logo-app.png")}
              resizeMode="contain"
              style={GlobalStyles.containerLogo}
            />
            <TouchableOpacity
              style={GlobalStyles.btnRedSmall}
              onPress={darurat}>
              <Text style={GlobalStyles.textButtonSmall}>IGD AMINO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ flex: 2 }}>
        <MySlider />
      </View>

      <View style={{ flex: 4, paddingHorizontal: 20 }}>
        <Text style={GlobalStyles.h3}>Menu</Text>
        <FlatList
          data={Menus}
          renderItem={({ item }) => (
            <CardButtonNavComponent
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
          )}
        />
      </View>
      {/* 
      <SpeedDial
        isOpen={open}
        icon={{ name: "edit", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
      >
        <SpeedDial.Action
          icon={{ name: "add", color: "#fff" }}
          title="Add"
          onPress={() => console.log("Add Something")}
        />
        <SpeedDial.Action
          icon={{ name: "delete", color: "#fff" }}
          title="Delete"
          onPress={() => console.log("Delete Something")}
        />
      </SpeedDial> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
