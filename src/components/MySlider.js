import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import React from "react";
import { Button, IconButton } from "react-native-paper";
import { Ionicons } from "react-native-vector-icons";
import { TextInput } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";

const styles = StyleSheet.create({
  mainContent: {
    // flex: 1,
    // padding: 10,
    // padding: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingTop: StatusBar.currentHeight,
    gap: 10,
  },
  //   srcContainer: {
  //     margin: 15,
  //     flexDirection: "row",
  //     alignItems: "center",
  //   },
  //   searchBar: {
  //     flexDirection: "row",
  //     alignItems: "center",
  //     // height: 32,
  //     borderColor: "gray",
  //     padding: 10,
  //     gap: 10,
  //     // marginHorizontal: 5,
  //     // flex: 1,
  //   },
  borderShadow: {
    borderRadius: 50,
    shadowColor: "gray",
    shadowOffset: {
      widh: 2,
      height: 1,
    },
    shadowOpacity: 5,
    shadowRadius: 2,
    elevation: 5,
    borderTopWidth: 0,
    borderLeftWidth: 0.2,
    backgroundColor: "#f5f5f5",
  },
  imageCarousel: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});

export default function MySlider() {
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
        "https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
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
      id: 5,
      image:
        "https://images.pexels.com/photos/2740956/pexels-photo-2740956.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];
  const { width } = useWindowDimensions(); //Agae dinamis sesuai perangkat

  return (
    <View style={styles.mainContent}>
      <View style={{ alignItems: "center" }}>
        <Carousel
          // loop
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.95,
            parallaxScrollingOffset: 100,
          }}
          width={width - 70}
          height={180}
          // autoPlay={true}
          data={dataCarousel}
          scrollAnimationDuration={3000}
          onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={({ item }) => (
            <Image
              style={styles.imageCarousel}
              source={{
                uri: item.image,
              }}
            />
          )}
        />
      </View>
    </View>
  );
}
