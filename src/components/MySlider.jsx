import React from "react";
import {
  View,
  Image,
  useWindowDimensions,
  StyleSheet,
  Linking,
} from "react-native";
import { TouchableRipple } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const dataCarousel = [
  {
    id: 1,
    link: "https://rs-amino.jatengprov.go.id/persalinan-caesar-metode-eracs-di-amino-hospital/",
    image:
      "https://rs-amino.jatengprov.go.id/wp-content/uploads/2024/06/ERACS.png",
  },
  {
    id: 2,
    link: "https://youtu.be/lYVULhq-BOM",
    image: "https://img.youtube.com/vi/lYVULhq-BOM/maxresdefault.jpg",
  },
  {
    id: 3,
    link: "https://rs-amino.jatengprov.go.id/say-no-to-suicide/",
    image:
      "https://rs-amino.jatengprov.go.id/wp-content/uploads/2024/05/SAY-NO-TO-SUICIDE.png",
  },
  {
    id: 4,
    link: "https://youtu.be/175fi-dh6X4",
    image: "https://img.youtube.com/vi/175fi-dh6X4/maxresdefault.jpg",
  },
];

export default function MySlider() {
  const { width } = useWindowDimensions();

  const handlePress = (link) => {
    if (link) {
      Linking.openURL(link);
    }
  };

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
          <TouchableRipple
            onPress={() => handlePress(item.link)}
            style={styles.borderShadow}
          >
            <Image
              style={styles.imageCarousel}
              source={{
                uri: item.image,
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
