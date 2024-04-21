import { Text, View } from "react-native";
import React, { Component, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import ButtonPrimary from "../../../components/ButtonPrimary";
import { Picker } from "@react-native-picker/picker";

const doctorsData = {
  1: [
    {
      kd_dokter: "D0000020",
      nm_dokter: "dr. A. SRI WOROASIH, Sp.KJ.",
      hari_kerja: "RABU",
      jam_mulai: "07:00:01",
      jam_selesai: "14:00:00",
      kd_poli: "9107",
      nm_poli: "POLI JIWA PSIKIATRI DEWASA",
      kuota: "70",

      id: 1,
      name: "Dr. San France",
      specialization: "Pediatrician",
      schedule: {
        Monday: ["10:00 AM - 1:00 PM", "3:00 PM - 6:00 PM"],
        Tuesday: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
        Wednesday: ["10:00 AM - 1:00 PM"],
      },
    },
    {
      id: 2,
      name: "Dr. Jade",
      specialization: "Dermatologist",
      schedule: {
        Tuesday: ["10:00 AM - 1:00 PM", "3:00 PM - 6:00 PM"],
        Thursday: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
        Friday: ["10:00 AM - 1:00 PM"],
      },
    },
  ],
  2: [
    {
      id: 1,
      name: "Dr. John Doe",
      specialization: "Pediatrician",
      schedule: {
        Monday: ["10:00 AM - 1:00 PM", "3:00 PM - 6:00 PM"],
        Tuesday: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
        Wednesday: ["10:00 AM - 1:00 PM"],
      },
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      specialization: "Dermatologist",
      schedule: {
        Tuesday: ["10:00 AM - 1:00 PM", "3:00 PM - 6:00 PM"],
        Thursday: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
        Friday: ["10:00 AM - 1:00 PM"],
      },
    },
  ],
};

export const Regist = ({ route }) => {
  const dataClinic = route.params;
  const doctors = doctorsData[dataClinic.clinicId] || [];

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <View style={{ marginTop: 20 }}>
      <Picker
        selectedValue={selectedDoctor}
        onValueChange={(itemValue) => setSelectedDoctor(itemValue)}>
        <Picker.Item label="Select a doctor" value={null} />
        {doctors.map((doctor) => (
          <Picker.Item key={doctor.id} label={doctor.name} value={doctor} />
        ))}
      </Picker>
    </View>
  );
};
