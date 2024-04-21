import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
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
import RegistrationScreen from "../view/screens/auth/RegistrationScreen";
import KlinikUmum from "../view/screens/poli/KlinikUmum";
import { IconButton, MD3Colors } from "react-native-paper";
import LoginScreen from "../view/screens/auth/LoginScreen";
import OnboardingScreen from "../view/screens/home/OnboardingScreen";

const InputForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    // tambahkan properti lain sesuai kebutuhan
  });

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    // Kirim data formData ke API menggunakan fetch atau library lainnya
    fetch("http://192.168.5.3:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit form");
        }
        return response.json();
      })
      .then((data) => {
        // Tanggapi respon dari API jika diperlukan
        console.log("Form submitted successfully:", data);
        Alert.alert("Success", "Form submitted successfully");
        // Bersihkan form setelah pengiriman berhasil
        setFormData({
          name: "",
          description: "",
          // reset properti lainnya jika perlu
        });
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        Alert.alert("Error", "Failed to submit form");
      });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => handleChange("name", text)}
        style={{ marginBottom: 10, borderBottomWidth: 1, paddingVertical: 5 }}
      />
      <TextInput
        placeholder="Description"
        value={formData.description}
        onChangeText={(text) => handleChange("description", text)}
        style={{ marginBottom: 10, borderBottomWidth: 1, paddingVertical: 5 }}
      />
      {/* Tambahkan TextInput lainnya sesuai kebutuhan */}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const YourScreenName = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://192.168.5.3:3000/products") // Ganti URL dengan URL API Anda
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
        console.log("API access successful"); // Log jika akses ke API berhasil
      })
      .catch((error) => {
        console.error("Error accessing API:", error); // Log jika terjadi error saat akses ke API
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://192.168.5.3:3000/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete data");
        }
        return response.json(); // Ubah ke response.json() agar Anda bisa mendapatkan data yang diperbarui setelah penghapusan
      })
      .then((data) => {
        console.log("Data deleted successfully:", data);
        Alert.alert("Success", "Data deleted successfully");
        // Refresh data setelah penghapusan berhasil
        setData((prevData) => prevData.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        Alert.alert("Error", "Failed to delete data");
      });
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>
                Created At: {new Date(item.createdAt).toLocaleDateString()}
              </Text>
              <Text>
                Updated At: {new Date(item.updatedAt).toLocaleDateString()}
              </Text>
              <Button title="Delete" onPress={() => handleDelete(item.id)} />
              <Button title="Edit" onPress={() => handleEdit(item.id)} />
            </View>
          )}
        />
      )}
    </View>
  );
};

const Tabs = createBottomTabNavigator();
export default function HomeTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        options={{
          // headerShown: true,
          headerRight: () => (
            <Ionicons name={"notifications-outline"} size={24} color="grey" />
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color="grey"
            />
          ),
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={24}
              color="grey"
            />
          ),
        }}
        name="Dashboard"
        component={LoginScreen}
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              size={24}
              color="grey"
            />
          ),
        }}
        name="Data"
        component={YourScreenName}
      />
      <Tabs.Screen
        options={{
          headerShown: true,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "create" : "create-outline"}
              size={24}
              color="grey"
            />
          ),
        }}
        name="Pendaftaran"
        component={RegistrationScreen}
      />
    </Tabs.Navigator>
  );
}
