import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  useWindowDimensions,
  StyleSheet,
  Linking,
  ActivityIndicator,
  Alert,
} from "react-native";
import { TouchableRipple } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BASE_URL } from "../contex/Config";

export default function MySlider() {
  const [dataBanner, setDataBanner] = useState([]);
  const [loading, setLoading] = useState(true);

  const dataCarousel = [
    // {
    //   id: 1,
    //   link: "https://rs-amino.jatengprov.go.id/persalinan-caesar-metode-eracs-di-amino-hospital/",
    //   link_image:
    //     "https://rs-amino.jatengprov.go.id/wp-content/uploads/2024/06/ERACS.png",
    // },
    // {
    //   id: 2,
    //   link: "https://youtu.be/lYVULhq-BOM",
    //   link_image: "https://img.youtube.com/vi/lYVULhq-BOM/maxresdefault.jpg",
    // },
    // {
    //   id: 3,
    //   link: "https://rs-amino.jatengprov.go.id/say-no-to-suicide/",
    //   link_image:
    //     "https://rs-amino.jatengprov.go.id/wp-content/uploads/2024/05/SAY-NO-TO-SUICIDE.png",
    // },
    // {
    //   id: 4,
    //   link: "https://youtu.be/175fi-dh6X4",
    //   link_image: "https://img.youtube.com/vi/175fi-dh6X4/maxresdefault.jpg",
    // },
  ];

  const getBanner = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/banners`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
        },
      });
      if (response.data && response.data.length > 0) {
        setDataBanner(response.data);
      } else {
        setDataBanner(dataCarousel);
      }
    } catch (error) {
      Alert.alert(
        "Maaf",
        "Terjadi kesalahan saat mengambil data banner. Mohon tunggu sebentar"
      );
      setDataBanner(dataCarousel);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  const handlePress = (link) => {
    if (link) {
      Linking.openURL(link);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <Carousel
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 60,
        }}
        width={wp(100)}
        height={hp(25)}
        autoPlay={true}
        data={dataBanner}
        scrollAnimationDuration={6000}
        renderItem={({ item }) => (
          <TouchableRipple
            onPress={() => handlePress(item.link)}
            style={styles.borderShadow}>
            <Image
              style={styles.imageCarousel}
              source={{
                uri: item.link_image,
              }}
            />
          </TouchableRipple>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  borderShadow: {
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff",
    marginHorizontal: 10,
  },
  imageCarousel: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
});
