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

export default function MySlider() {
  // const { width } = useWindowDimensions();
  const [dataBanner, setDataBanner] = useState();
  const [loading, setLoading] = useState(true);

  const getBanner = async () => {
    try {
      const response = await axios.get("http://192.168.5.3:8000/api/banners");
      setDataBanner(response.data);
      setLoading(false);
    } catch (error) {
      Alert.alert(
        "Maaf",
        "Terjadi kesalahan saat mengambil data banner. Mohon tunggu sebentar"
      );
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
        // onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ item }) => (
          <TouchableRipple
            onPress={() => handlePress(item.link)}
            style={styles.borderShadow}
          >
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
