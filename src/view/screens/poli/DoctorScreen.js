import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Text, View } from "react-native";

// Data contoh untuk dokter, hari, dan jam
const doctorsData = {
  1: [
    {
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

const DoctorScreen = ({ route }) => {
  const dataClinic = route.params;
  const doctors = doctorsData[dataClinic.clinicId] || [];

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
        Doctors for Clinic {dataClinic.nameClinic}
      </Text>
      <Picker
        selectedValue={selectedDoctor}
        onValueChange={(itemValue) => setSelectedDoctor(itemValue)}>
        <Picker.Item label="Select a doctor" value={null} />
        {doctors.map((doctor) => (
          <Picker.Item key={doctor.id} label={doctor.name} value={doctor} />
        ))}
      </Picker>

      <Text style={{ fontWeight: "bold", marginTop: 20 }}>Select a day:</Text>
      <Picker
        selectedValue={selectedDay}
        onValueChange={(itemValue) => setSelectedDay(itemValue)}>
        <Picker.Item label="Select a day" value={null} />
        {selectedDoctor &&
          Object.keys(selectedDoctor.schedule).map((day, index) => (
            <Picker.Item key={index} label={day} value={day} />
          ))}
      </Picker>

      {selectedDoctor && selectedDay && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Select a time:</Text>
          <Picker
            selectedValue={selectedTime}
            onValueChange={(itemValue) => setSelectedTime(itemValue)}>
            <Picker.Item label="Select a time" value={null} />
            {selectedDoctor.schedule[selectedDay].map((time, index) => (
              <Picker.Item key={index} label={time} value={time} />
            ))}
          </Picker>
        </View>
      )}

      {selectedDoctor && selectedDay && selectedTime && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Selected Doctor:</Text>
          <Text>{selectedDoctor.name}</Text>
          <Text style={{ color: "gray" }}>{selectedDoctor.specialization}</Text>
          <Text style={{ fontWeight: "bold", marginTop: 10 }}>
            Selected Day:
          </Text>
          <Text>{selectedDay}</Text>
          <Text style={{ fontWeight: "bold", marginTop: 10 }}>
            Selected Time:
          </Text>
          <Text>{selectedTime}</Text>
          {/* Tampilkan informasi lain tentang dokter dan jadwal jika perlu */}
        </View>
      )}
    </View>
  );
};

export default DoctorScreen;
