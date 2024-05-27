import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CardListComponent = ({ data }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{data.kelas}</Text>
      <View style={styles.row}>
        <Text style={(styles.label, styles.subTitle)}>
          Jumlah Bed Non Jiwa :
        </Text>
        <Text style={styles.value}>{data.jumlah_bed_umum}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Bed Terisi :</Text>
        <Text style={styles.value}>{data.bed_terisi_umum}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Bed Kosong :</Text>
        <Text style={styles.value}>{data.bed_kosong_umum}</Text>
      </View>
      <View style={styles.row}>
        <Text style={(styles.label, styles.subTitle)}>Jumlah Bed Jiwa :</Text>
        <Text style={styles.value}>{data.jumlah_bed_jiwa}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Bed Terisi :</Text>
        <Text style={styles.value}>{data.bed_terisi_jiwa}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Bed Kosong Jiwa :</Text>
        <Text style={styles.value}>{data.bed_kosong_jiwa}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    color: "#555",
  },
  subTitle: {
    fontSize: 16,
    color: "#555",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default CardListComponent;
