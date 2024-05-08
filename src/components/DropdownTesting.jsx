import { View, Text, TextInput, Button, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";

const DropdownTesting = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");

  // Data poliklinik dan dokter (contoh)
  const clinics = [
    { id: 1, name: "Poliklinik Umum" },
    { id: 2, name: "Poliklinik Gigi" },
    // Tambahkan poliklinik lainnya jika diperlukan
  ];

  const fetchDoctorsByClinic = async (clinicId) => {
    // Misalnya, ambil data dokter dari API berdasarkan id poliklinik
    try {
      // Implementasi logika pengambilan data dari API di sini
      const response = await fetch(
        `https://example.com/api/doctors?clinicId=${clinicId}`
      );
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    // Panggil fungsi untuk mengambil data dokter berdasarkan poliklinik yang dipilih
    if (selectedClinic) {
      fetchDoctorsByClinic(selectedClinic);
    }
  }, [selectedClinic]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        margin: 20,
      }}
    >
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Pilih Dokter dan Klinik
      </Text>
      <Picker
        selectedValue={selectedClinic}
        onValueChange={(itemValue) => setSelectedClinic(itemValue)}
        style={{ height: 50, width: 200, marginBottom: 20 }}
      >
        <Picker.Item label="Select Clinic" value="" />
        {clinics.map((clinic) => (
          <Picker.Item key={clinic.id} label={clinic.name} value={clinic.id} />
        ))}
      </Picker>
      {selectedClinic ? (
        <Picker
          selectedValue={selectedDoctor}
          onValueChange={(itemValue) => setSelectedDoctor(itemValue)}
          style={{ height: 50, width: 200 }}
        >
          <Picker.Item label="Select Doctor" value="" />
          {doctors.map((doctor) => (
            <Picker.Item
              key={doctor.id}
              label={doctor.name}
              value={doctor.id}
            />
          ))}
        </Picker>
      ) : null}
      <Text style={{ marginTop: 20 }}>
        Selected Doctor: {selectedDoctor ? selectedDoctor : "None"}
      </Text>
    </View>
  );
};

export default DropdownTesting;
