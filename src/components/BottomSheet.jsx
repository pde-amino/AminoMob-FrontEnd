import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  Pressable,
  FlatList,
} from "react-native";
import ButtonPrimary from "./ButtonPrimary";
import CardButtonNavComponent from "./CardButtonNavComponent";
import { useNavigation } from "@react-navigation/native";
import GlobalStyles from "../style/GlobalStyles";

const WARNA = { primary: "#0A78E2", white: "#fff" };

const BottomSheet = ({
  setStatus,
  judul,
  subjudul,
  buttonKiri,
  buttonKanan,
  ukuranModal,
  pressKanan,
  pressKiri,
  list,
  dataList,
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

  const navHandle = () => {
    navigation.navigate("Pendaftaran Poli");
  };
  return (
    <Pressable onPress={closeModal} style={styles.backdrop}>
      <Pressable style={ukuranModal}>
        <Animated.View
          style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}
        >
          <Text style={GlobalStyles.h2}>{judul}</Text>
          <Text
            style={(GlobalStyles.textBiasa, { marginTop: 10, lineHeight: 20 })}
          >
            {subjudul}
          </Text>
          {list ? (
            <View>
              <ButtonPrimary
                title={"+ Tambahkan Kerabat"}
                onPress={navHandle}
              />
              {dataList ? (
                <FlatList
                  data={dataList}
                  renderItem={({ item }) => (
                    <CardButtonNavComponent
                      title={item.NAMA_PAS}
                      description={"Ini Desc List Kerabat"}
                      onPress={"Pilih Poli"}
                      data={item}
                      warna={"blue"}
                    />
                  )}
                />
              ) : (
                <Text>
                  Belum ada Kerabat yang terdaftar, silahkan klik tambahkan
                  kerabat.
                </Text>
              )}
            </View>
          ) : (
            <View
              style={{
                marginTop: 12,
                flexDirection: "row",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <TouchableOpacity style={styles.btnKiri} onPress={pressKiri}>
                <Text style={[GlobalStyles.h4, { color: WARNA.primary }]}>
                  {buttonKiri}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnKanan} onPress={pressKanan}>
                <Text style={[GlobalStyles.h4, { color: WARNA.white }]}>
                  {buttonKanan}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </Pressable>
    </Pressable>
  );
};

export default BottomSheet;

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
  btnKanan: {
    width: "50%",
    height: 48,
    justifyContent: "center",
    // paddingHorizontal: 24,
    // paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: WARNA.primary,
    alignItems: "center",
    // marginTop: 15,
  },
  btnKiri: {
    width: "50%",
    height: 48,
    justifyContent: "center",
    // paddingHorizontal: 24,
    // paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: WARNA.primary,
    // backgroundColor: "#fffff",
    alignItems: "center",
    // marginTop: 15,
  },
});
