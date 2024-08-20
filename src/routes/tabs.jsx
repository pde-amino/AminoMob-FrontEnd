import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useCallback, useContext } from "react";
import HomeScreen from "../view/screens/home/HomeScreen";
import { useState, useEffect } from "react";
import { Alert } from "react-native";
import ProfileScreen from "../view/screens/auth/ProfileScreen";
import { AuthContex } from "../contex/AuthProvider";
import RiwayatKunjungan from "../view/screens/riwayat/RiwayatKunjungan";
import InfoListPasien from "../view/screens/informasi/InfoListPasien";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../contex/Config";
import { Icon } from "react-native-paper";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";

const Tabs = createBottomTabNavigator();

export default function HomeTabs() {
  const { logout, auth } = useContext(AuthContex);
  // const [dataUser, setDataUser] = useState(null);
  const navigation = useNavigation();

  const paksaLogout = () => {
    navigation.replace("Login Screen");
  };

  console.log("Testing", auth);
  const fetchData = async () => {
    if (!auth || !auth.hp || !auth.id) {
      // return; // Exit early if auth or auth.user is not defined
      // coansole.log("tidak ada auth", auth);
    }
    try {
      await axios.get(`${BASE_URL}/cariId/${auth.id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
    } catch (error) {
      if (
        error.message === "Request failed with status code 401" ||
        error.response.status === 401
      ) {
        AsyncStorage.removeItem("userInfo");
        logout();
        Alert.alert(
          "Maaf",
          "Akun Anda login menggunakan perangkat lain, hanya bisa login dengan satu perangkat",
          [{ text: "OK", onPress: () => paksaLogout() }]
        );
        return;
      } else {
        Alert.alert("Maaf", error);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      const intervalId = setInterval(() => {
        // fetchData();
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
          padding: 10,
        },
      }}>
      <Tabs.Screen
        options={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ focused }) => (
            <Icon
              source={focused ? "home" : "home-outline"}
              size={28}
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
            <Icon
              source={focused ? "book" : "book-outline"}
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
            <Icon
              source={focused ? "text-box" : "text-box-outline"}
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
            <Icon
              source={focused ? "account" : "account-outline"}
              size={28}
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
