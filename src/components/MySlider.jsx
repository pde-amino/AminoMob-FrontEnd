import React, { useState } from "react";
import {
  View,
  Image,
  useWindowDimensions,
  StyleSheet,
  Dimensions,
  Linking,
  TouchableOpacity,
} from "react-native";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const dataCarousel = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/776087/pexels-photo-776087.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    image:
      "https://rs-amino.jatengprov.go.id/wp-content/uploads/2024/06/ERACS.png",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 5,
    image:
      "https://images.pexels.com/photos/2740956/pexels-photo-2740956.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    image:
      "https://images.pexels.com/photos/2740956/pexels-photo-2740956.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function MySlider() {
  const { width } = useWindowDimensions();

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
        // pagingEnabled={pagingEnabled}
        // snapEnabled={snapEnabled}
        data={dataCarousel}
        scrollAnimationDuration={6000}
        // onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://www.youtube.com/@RSJDDrAminoGondohutomo")
            }
            style={styles.borderShadow}>
            <Image
              style={styles.imageCarousel}
              source={{
                uri: item.image,
              }}
            />
          </TouchableOpacity>
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
