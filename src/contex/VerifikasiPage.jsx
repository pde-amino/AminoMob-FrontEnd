import React, { useContext, useState } from "react";
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

const VerifikasiPage = () => {
  const { data } = useContext(AuthContex);
  const [photoUri1, setPhotoUri1] = useState(null); // State untuk menyimpan URI foto untuk kartu pertama
  const [photoUri2, setPhotoUri2] = useState(null); // State untuk menyimpan URI foto untuk kartu kedua
  const navigation = useNavigation();

  const uploadImage = async () => {
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
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      alert("Sorry Error :" + error.message);
    }
  };

  const saveImage = async (image) => {
    try {
      if (!photoUri1) {
        setPhotoUri1(image);
      } else if (!photoUri2) {
        setPhotoUri2(image);
      } else {
        // Tampilkan pesan atau lakukan tindakan lain jika kedua kartu sudah memiliki foto
        console.log("Kedua kartu sudah memiliki foto.");
      }
    } catch (error) {
      throw error;
    }
  };

  const sendImage = async () => {
    if (!photoUri1 || !photoUri2) {
      Alert.alert("Error", "Please provide both photos before submitting.");
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
      console.log("Token:", data.token); // Log token
      console.log("FormData:", formData); // Log FormData

      const response = await axios.post(
        `${BASE_URL}/uploadVerifikasi/${data.ids}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Menambahkan token ke header
          },
        }
      );
      const verivData = response.data;
      Alert.alert("Success", "Data berhasil dikirim!");
    } catch (error) {
      console.log("Error response:", error.response); // Log error response
      Alert.alert("Error", "Gagal mengirim data: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[styles.card, photoUri1 && styles.cardWithPhoto]}
          onPress={uploadImage}>
          {photoUri1 && (
            <Image source={{ uri: photoUri1 }} style={styles.previewImage} />
          )}
          {!photoUri1 && <Text style={styles.placeholderText}>Kartu 1</Text>}
          <Text style={styles.buttonText}>Ambil Foto</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[styles.card, photoUri2 && styles.cardWithPhoto]} // Tambahkan style khusus jika ada foto di state
          onPress={uploadImage}>
          {photoUri2 && (
            <Image source={{ uri: photoUri2 }} style={styles.previewImage} />
          )}
          {!photoUri2 && <Text style={styles.placeholderText}>Kartu 2</Text>}
          <Text style={styles.buttonText}>Ambil Foto</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={sendImage}>
          <Text style={styles.buttonText}>Kirim Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  cardWithPhoto: {
    borderColor: "green", // Ganti warna border jika ada foto di state
  },
  previewImage: {
    width: screenWidth - 20, // Lebar mengikuti lebar layar dengan sedikit margin
    height: ((screenWidth - 20) * 3) / 4, // Sesuaikan tinggi sesuai dengan aspect ratio 4:3
    marginBottom: 10,
  },
  placeholderText: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "blue",
  },
});

export default VerifikasiPage;
