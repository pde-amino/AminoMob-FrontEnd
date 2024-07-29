import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { BASE_URL } from "./Config";
import { AuthContex } from "./AuthProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonPrimary from "../components/ButtonPrimary";
import HeaderComponent from "../components/HeaderComponent";
import GlobalStyles from "../style/GlobalStyles";
import { Checkbox } from "react-native-paper";

const WARNA = { primary: "#0A78E2", secondary: "#5DA3E7", white: "#fff" };

const VerifikasiPage = () => {
  const { data } = useContext(AuthContex);
  const [photoUri1, setPhotoUri1] = useState(null); // State untuk menyimpan URI foto untuk kartu pertama
  const [photoUri2, setPhotoUri2] = useState(null); // State untuk menyimpan URI foto untuk kartu kedua
  const navigation = useNavigation();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setPhotoUri1(null);
      setPhotoUri2(null);
    });

    return unsubscribe;
  }, [navigation]);

  const uploadImage = async (photoType) => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.back,
        // mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        await saveImage(result.assets[0].uri, photoType);
      }
    } catch (error) {
      alert("Sorry Error :" + error.message);
    }
  };

  const saveImage = async (image, photoType) => {
    try {
      if (photoType === "ktp") {
        setPhotoUri1(image);
      } else if (photoType === "swafoto") {
        setPhotoUri2(image);
      }
    } catch (error) {
      throw error;
    }
  };

  const sendImage = async () => {
    if (!photoUri1 || !photoUri2) {
      Alert.alert("Error", "Mohon ambil foto KTP dan selfie terlebih dahulu");
      return;
    }

    const formData = new FormData();
    formData.append("ktp", {
      uri: photoUri1,
      name: "ktp.jpg",
      type: "image/jpeg",
    });
    formData.append("swafoto", {
      uri: photoUri2,
      name: "swafoto.jpg",
      type: "image/jpeg",
    });
    formData.append("stts", "Proses");

    try {
      const token =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2dpbi1hcGktcHJvamVjdCIsInN1YiI6ImxvZ2ludG9rZW4iLCJpYXQiOjE3MTU5MTUyMDUsImV4cCI6MTcxNjAwMTYwNSwidWlkIjoiNCIsIm5vX3JrbV9tZWRpcyI6bnVsbH0.KRcCvT9tXZsYr0Q-d-ThXq8W5xKcgEFT0v-WiPFILz4"; // Ganti dengan token autentikasi yang valid

      const response = await axios.post(
        `${BASE_URL}/uploadVerifikasi/${data.ids}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
            Authorization: `Bearer ${token}`, // Menambahkan token ke header
          },
        }
      );
      const verivData = response.data;
      Alert.alert("Success", "Data berhasil dikirim!");
    } catch (error) {
      Alert.alert("Error", "Gagal mengirim data: " + error.message);
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <HeaderComponent
        title={"Verifikasi"}
        icon={"arrow-back"}
        onPress={() => navigation.goBack()}
      />
      <View style={GlobalStyles.Content}>
        <View style={styles.cardContainer}>
          <Text style={GlobalStyles.h4}>Ambil foto Kartu KTP</Text>
          <TouchableOpacity
            style={[styles.card, photoUri1 && styles.cardWithPhoto]}
            onPress={() => uploadImage("ktp")}
          >
            {photoUri1 && (
              <Image source={{ uri: photoUri1 }} style={styles.previewImage} />
            )}
            {!photoUri1 && (
              <Image
                source={require("../../assets/camera1.png")}
                style={{
                  height: 100,
                  width: 100,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <Text style={GlobalStyles.h4}>Ambil Selfie dengan Kartu KTP</Text>
          <TouchableOpacity
            style={[styles.card, photoUri2 && styles.cardWithPhoto]} // Tambahkan style khusus jika ada foto di state
            onPress={() => uploadImage("swafoto")}
          >
            {photoUri2 && (
              <Image source={{ uri: photoUri2 }} style={styles.previewImage} />
            )}
            {!photoUri2 && (
              <Image
                source={require("../../assets/camera1.png")}
                style={{
                  height: 100,
                  width: 100,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%" }}>
          <Checkbox.Item
            style={GlobalStyles.cekBox}
            color={WARNA.primary}
            label="Pastikan foto yang anda kirim tajam dan jelas"
            labelStyle={GlobalStyles.textBiasa}
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          />
        </View>
        <View style={{ width: screenWidth * 0.9 }}>
          <ButtonPrimary
            title="Verifikasi"
            onPress={sendImage}
            disabled={!checked || !photoUri1 || !photoUri2}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 8,
    // backgroundColor: "pink",
    gap: 8,
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth * 0.9,
    height: screenWidth * 0.55,
    borderWidth: 4,
    borderColor: WARNA.primary,
    borderRadius: 20,
    borderStyle: "dashed",
    backgroundColor: "#D3EAFF",
  },
  cardWithPhoto: {
    borderColor: "green", // Ganti warna border jika ada foto di state
    borderStyle: "solid",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
});

export default VerifikasiPage;
