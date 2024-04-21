import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Slider from "@react-native-community/slider";

const Card = ({ title, description }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
};

const SliderComponent = () => {
  // Gunakan state untuk menyimpan nilai slider
  const [value, setValue] = useState(0);

  const cardData = [
    {
      id: "1",
      title: "Card 1",
      description: "Description 1",
    },
    {
      id: "2",
      title: "Card 2",
      description: "Description 2",
    },
    {
      id: "3",
      title: "Card 3",
      description: "Description 3",
    },
    // Tambahkan lebih banyak data kartu jika diperlukan
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nilai: {value.toFixed(2)}</Text>
      <Slider
        style={styles.slider}
        value={value}
        onValueChange={(val) => setValue(val)}
        minimumValue={0}
        maximumValue={cardData.length - 1}
        step={1}
        minimumTrackTintColor="#FF6347"
        maximumTrackTintColor="#C0C0C0"
        thumbTintColor="#FF6347"
      />
      <FlatList
        data={cardData}
        renderItem={({ item, index }) => {
          // Render kartu jika index cocok dengan nilai slider
          if (index === value) {
            return <Card title={item.title} description={item.description} />;
          }
          return null;
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  slider: {
    width: "80%",
  },
  card: {
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    marginVertical: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
  },
});

export default SliderComponent;
