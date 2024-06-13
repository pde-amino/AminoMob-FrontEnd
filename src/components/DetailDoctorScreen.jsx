import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { Ionicons } from "react-native-vector-icons";
import axios from "axios";
// import { BASE_URL } from "../config"; // ganti dengan path yang benar untuk file config Anda

const DetailDoctorScreen = () => {
  //   const { doctorId } = route.params;
  //   const [doctorData, setDoctorData] = useState(null);
  //   const [loading, setLoading] = useState(true);

  //   const fetchDoctorData = async () => {
  //     try {
  //       //   const response = await axios.get(`${BASE_URL}/doctors/${doctorId}`);
  //       setDoctorData(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching doctor data:", error);
  //       Alert.alert("Error", "Failed to load doctor data");
  //       setLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchDoctorData();
  //   }, []);

  //   if (loading) {
  //     return (
  //       <SafeAreaView style={styles.container}>
  //         <ActivityIndicator size="large" color="#0000ff" />
  //       </SafeAreaView>
  //     );
  //   }

  //   if (!doctorData) {
  //     return (
  //       <SafeAreaView style={styles.container}>
  //         <Text>No doctor data available.</Text>
  //       </SafeAreaView>
  //     );
  //   }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={120}
            source={{ uri: `http://192.168.5.5:8080/foto_dok/D0000019.png` }}
          />
        </View>
        <View style={styles.infoContainer}>
          <Title>{"doctorData.name"}</Title>
          <Paragraph>{"doctorData.position"}</Paragraph>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>
              <Ionicons name="star" />
              <Ionicons name="star" />
              <Ionicons name="star" />
              <Ionicons name="star" />
              <Ionicons name="star-outline" />
              {/* <Icon name="star-outline"></ion-icon> */}
              {/* {`Rating: ${"doctorData.rating"}`} */}
            </Text>
            <Text style={styles.ratingCountText}>
              {/* {`(${"doctorData.ratingCount"} ratings)`} */}
            </Text>
          </View>
        </View>
        <Card>
          <Card.Content>
            <Title>Jadwal Praktik</Title>
            {/* {doctorData.schedule.map((item, index) => ( */}
            <Paragraph>"asasa"</Paragraph>
            {/* ))} */}
          </Card.Content>
        </Card>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.goBack()}>
          Back
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 222,
    backgroundColor: "white",
  },
  scrollViewContent: {
    padding: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 16,
    marginRight: 5,
  },
  ratingCountText: {
    fontSize: 14,
    color: "grey",
  },
  button: {
    marginTop: 20,
  },
});

export default DetailDoctorScreen;
