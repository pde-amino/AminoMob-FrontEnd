import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Pressable,
  FlatList,
} from "react-native";
import CardButtonNavComponent from "./CardButtonNavComponent";
import { useNavigation } from "@react-navigation/native";
import GlobalStyles from "../style/GlobalStyles";

const WARNA = { primary: "#0A78E2", white: "#fff" };

const BottomSheetMenu = ({
  setStatus,
  judul,
  subjudul,
  ukuranModal,
  dataMenu,
  onMenuPress,
}) => {
  const navigation = useNavigation();
  const slide = React.useRef(new Animated.Value(300)).current;
  const slideUp = () => {
    // Will change slide up the bottom sheet
    Animated.timing(slide, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    // Will slide down the bottom sheet
    Animated.timing(slide, {
      toValue: 300,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    slideUp();
  });

  const closeModal = () => {
    slideDown();

    setTimeout(() => {
      setStatus(false);
    }, 800);
  };

  const renderItem = ({ item }) => (
    <CardButtonNavComponent
      data={item.kd_poli}
      title={item.title}
      description={item.desc}
      onPress={() => onMenuPress(item)}
      warna={item.warna}
      imgSource={item.img}
    />
  );

  return (
    <Pressable onPress={closeModal} style={styles.backdrop}>
      <Pressable style={ukuranModal}>
        <Animated.View
          style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}
        >
          <Text style={GlobalStyles.h3}>{judul}</Text>
          <Text
            style={{
              fontSize: 14,
              color: "grey",
            }}
          >
            {subjudul}
          </Text>

          <FlatList
            data={dataMenu}
            renderItem={renderItem}
            // renderItem={({ item }) => (
            //   <CardButtonNavComponent
            //     data={item.kd_poli}
            //     title={item.title}
            //     description={item.desc}
            //     onPress={() => {
            //       item.to();
            //       slideDown();
            //     }}
            //     warna={item.warna}
            //     imgSource={item.img}
            //   />
            // )}
            keyExtractor={(item) => item.kd_poli}
          />
        </Animated.View>
      </Pressable>
    </Pressable>
  );
};

export default BottomSheetMenu;

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    flex: 1,
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
