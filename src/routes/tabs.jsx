import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useCallback, useContext } from "react";
import { Ionicons } from "react-native-vector-icons";
import FavoriteScreen from "../view/screens/home/FavoriteScreen";
import HomeScreen from "../view/screens/home/HomeScreen";
import { useState, useEffect } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import TestingWeb from "../view/screens/web/TestingWeb";
import RegistrationScreen from "../view/screens/auth/SignupScreen";
import KlinikUmum from "../view/screens/poli/KlinikUmum";
import { IconButton, MD3Colors } from "react-native-paper";
import LoginScreen from "../view/screens/auth/LoginScreen";
import OnboardingScreen from "../view/screens/home/OnboardingScreen";
import ProfileScreen from "../view/screens/auth/ProfileScreen";
import TestingScreen from "../view/screens/home/TestingScreen";
import { TambahPasien } from "../view/screens/pendaftaran/TambahPasien";
import { AuthContex } from "../contex/AuthProvider";
import BookingScreen from "../view/screens/Verifikasi/BookingScreen";
import Swafoto from "../contex/SwaFoto";
import VerifikasiPage from "../contex/VerifikasiPage";
import RiwayatKunjungan from "../view/screens/riwayat/RiwayatKunjungan";
import ListPasien from "../view/screens/pendaftaran/ListPasien";
import InfoListPasien from "../view/screens/informasi/InfoListPasien";
import { PilihPoli } from "../view/screens/pendaftaran/PilihPoli";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../contex/Config";

// const InputForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     // tambahkan properti lain sesuai kebutuhan
//   });

//   const handleChange = (key, value) => {
//     setFormData({ ...formData, [key]: value });
//   };

// const handleSubmit = () => {
//   // Kirim data formData ke API menggunakan fetch atau library lainnya
//   fetch("http://192.168.5.3:3000/products", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formData),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Failed to submit form");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       // Tanggapi respon dari API jika diperlukan
//       console.log("Form submitted successfully:", data);
//       Alert.alert("Success", "Form submitted successfully");
//       // Bersihkan form setelah pengiriman berhasil
//       setFormData({
//         name: "",
//         description: "",
//         // reset properti lainnya jika perlu
//       });
//     })
//     .catch((error) => {
//       console.error("Error submitting form:", error);
//       Alert.alert("Error", "Failed to submit form");
//     });
// };

// return (
//   <View style={{ flex: 1, padding: 20 }}>
//     <TextInput
//       placeholder="Name"
//       value={formData.name}
//       onChangeText={(text) => handleChange("name", text)}
//       style={{ marginBottom: 10, borderBottomWidth: 1, paddingVertical: 5 }}
//     />
//     <TextInput
//       placeholder="Description"
//       value={formData.description}
//       onChangeText={(text) => handleChange("description", text)}
//       style={{ marginBottom: 10, borderBottomWidth: 1, paddingVertical: 5 }}
//     />
//     {/* Tambahkan TextInput lainnya sesuai kebutuhan */}
//     <Button title="Submit" onPress={handleSubmit} />
//   </View>
// );
// };

// const YourScreenName = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://192.168.5.3:3000/products") // Ganti URL dengan URL API Anda
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((json) => {
//         setData(json);
//         setLoading(false);
//         console.log("API access successful"); // Log jika akses ke API berhasil
//       })
//       .catch((error) => {
//         console.error("Error accessing API:", error); // Log jika terjadi error saat akses ke API
//         setLoading(false);
//       });
//   }, []);

//   const handleDelete = (id) => {
//     fetch(`http://192.168.5.3:3000/products/${id}`, {
//       method: "DELETE",
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to delete data");
//         }
//         return response.json(); // Ubah ke response.json() agar Anda bisa mendapatkan data yang diperbarui setelah penghapusan
//       })
//       .then((data) => {
//         console.log("Data deleted successfully:", data);
//         Alert.alert("Success", "Data deleted successfully");
//         // Refresh data setelah penghapusan berhasil
//         setData((prevData) => prevData.filter((item) => item.id !== id));
//       })
//       .catch((error) => {
//         console.error("Error deleting data:", error);
//         Alert.alert("Error", "Failed to delete data");
//       });
//   };

//   return (
//     <View style={{ flex: 1, padding: 24 }}>
//       {isLoading ? (
//         <ActivityIndicator />
//       ) : (
//         <FlatList
//           data={data}
//           keyExtractor={({ id }) => id.toString()}
//           renderItem={({ item }) => (
//             <View style={{ marginBottom: 10 }}>
//               <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
//               <Text>{item.description}</Text>
//               <Text>
//                 Created At: {new Date(item.createdAt).toLocaleDateString()}
//               </Text>
//               <Text>
//                 Updated At: {new Date(item.updatedAt).toLocaleDateString()}
//               </Text>
//               <Button title="Delete" onPress={() => handleDelete(item.id)} />
//               <Button title="Edit" onPress={() => handleEdit(item.id)} />
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// Misal Membuat Kondisi Pisah Menu Internal External
// jika kondisi admin maka tampilkan jika pubkic hidden
// mungkin dengan menggunakan fetch api mungkin / dengan kondisi dtatus admin dikeluarkan

const Tabs = createBottomTabNavigator();

export default function HomeTabs() {
  const { logout, auth } = useContext(AuthContex);
  const [dataUser, setDataUser] = useState(null);
  const navigation = useNavigation();
  // console.log("AuthTabs :", data);

  const paksaLogout = () => {
    navigation.replace("Login Screen");
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/cariId/${auth.user.id}`, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      console.log("Fetch cek login data:", response.data);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      if (
        error.message === "Request failed with status code 401" ||
        error.messages.error === "Token tidak valid atau tidak ditemukan"
      ) {
        AsyncStorage.removeItem("userInfo");
        logout();
        Alert.alert(
          "Maaf",
          "Akun Anda login menggunakan perangkat lain, hanya bisa login dengan satu perangkat",
          [{ text: "OK", onPress: () => paksaLogout() }]
        );
        return;
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      const intervalId = setInterval(() => {
        fetchData();
      }, 10000); // 30000 ms = 30 seconds

      return () => clearInterval(intervalId); // Clear interval on component unmount
    }, [])
  );

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          borderTopWidth: 1,
          elevation: 2,
        },
      }}
    >
      <Tabs.Screen
        options={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color="grey"
            />
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      {/* {auth.role === "admin" ? ( */}
      {/* <Tabs.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={24}
              color="grey"
            />
          ),
        }}
        name="DUMMY "
        component={BookingScreen}
      /> */}
      {/* ) : null} */}

      <Tabs.Screen
        options={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              size={24}
              color="grey"
            />
          ),
        }}
        name="Riwayat"
        component={RiwayatKunjungan}
      />
      <Tabs.Screen
        options={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "document-text" : "document-text-outline"}
              size={24}
              color="grey"
            />
          ),
        }}
        name="Data Pasien"
        component={InfoListPasien}
      />
      <Tabs.Screen
        options={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              // name={focused ? "person" : "person-outline"}
              size={24}
              color="grey"
            />
          ),
        }}
        name="Profil"
        component={ProfileScreen}
      />
    </Tabs.Navigator>
  );
}
