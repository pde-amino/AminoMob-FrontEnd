import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

const DetailPoli = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fungsi untuk mendapatkan data jadwal dari API atau penyimpanan lokal
    const fetchData = async () => {
      try {
        // Mengambil data jadwal dari sumber data tertentu
        // Misalnya, ambil dari API dengan fetch atau axios
        // const response = await fetch('https://api.example.com/schedule');
        // const data = await response.json();
        // setScheduleData(data);

        // Contoh data jadwal sementara (gunakan data dari API sesungguhnya di sini)
        const dummyScheduleData = [
          { id: 1, time: '08:00', event: 'Meeting' },
          { id: 2, time: '10:00', event: 'Presentation' },
          { id: 3, time: '12:00', event: 'Lunch' },
          // Tambahkan data jadwal lainnya di sini...
        ];
        setScheduleData(dummyScheduleData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching schedule data:', error);
        // Mengatur state untuk menunjukkan bahwa ada kesalahan saat mengambil data jadwal
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Schedule</Text>
      <FlatList
        data={scheduleData}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.time}</Text>
            <Text>{item.event}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
});

export default DetailPoli;
