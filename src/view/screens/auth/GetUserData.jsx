import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GetUserData = async () => {
  try {
    const userString = await SecureStore.getItemAsync("userData"); // Ambil string JSON
    if (userString) {
      const user = JSON.parse(userString); // Konversi string JSON menjadi objek
      await AsyncStorage.setItem("userInfo", JSON.stringify(user)); // Simpan data ke AsyncStorage jika diperlukan
      console.log("Data pengguna berhasil diambil:", user.id);

      return user; // Kembalikan data pengguna
    } else {
      console.log("Data pengguna tidak ditemukan");
      return null; // Kembalikan null jika data tidak ditemukan
    }
  } catch (error) {
    console.log("Gagal mengambil data pengguna:", error);
    return null; // Kembalikan null jika terjadi kesalahan
  }
};

export default GetUserData;
