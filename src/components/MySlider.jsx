import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Linking,
  ActivityIndicator,
  Alert,
  Text,
} from "react-native";
import { TouchableRipple } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function MySlider() {
  const [dataBanner, setDataBanner] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getBanner = async () => {
    try {
      const response = await axios.get(`http://192.168.5.5:8080/banners`, {
        headers: {
          "x-api-key":
            "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
        },
        timeout: 10000,
      });

      if (response.data && response.data.data) {
        setDataBanner(response.data.data);
      } else {
        setDataBanner([]);
        setError("Data tidak ditemukan");
      }
    } catch (error) {
      setDataBanner([]);
      setError("Gagal memuat data. Silakan coba lagi nanti.");
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

  if (error) {
    return null;
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
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
