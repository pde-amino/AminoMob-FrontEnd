import {
  Alert,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import TextInputIconComponent from "../../../components/TextInputIconComponent";
import axios from "axios";
import { AIRest } from "../../../contex/Config";
import ButtonPrimary from "../../../components/ButtonPrimary";
import HeaderComponent from "../../../components/HeaderComponent";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import RenderHTML from "react-native-render-html";
import { ActivityIndicator, IconButton } from "react-native-paper";

const AIScreen = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const botMessage = {
      id: Date.now().toString(),
      sender: "bot",
      message: `Ini adalah layanan chat AI Otomatis Amino Hospital. AI yang
                digunakan dalam sistem ini memberikan respon berdasarkan
                informasi yang telah ditentukan, coba tanyakan : <strong>alamat</strong>, <strong>kontak</strong>, <strong>fasilitas</strong>, 
                <strong>layanan</strong>, <strong>pengaduan</strong>, <strong>kritik dan saran</strong>, <strong>jenguk pasien</strong>, 
                <strong>jam besuk</strong>, <strong>jadwal dokter</strong>, <strong>info lainnya</strong>. 
                </br>
                </br>
                Jika Anda ingin
                memberikan pertanyaan yang membutuhkan jawaban kompleks coba
                gunakan kata awalan :
                <strong>apa</strong>, <strong>bagaimana</strong>,
                <strong>gimana</strong>, <strong>tanya</strong>,
                <strong>bertanya</strong>, <strong>menanyakan</strong> - agar AI
                dapat mencarikan informasi yang lebih luas. 
                </br>
                </br>
                AI akan mencoba
                memberi jawaban berdasarkan informasi yang diambil dari sumber
                di internet. Meskipun AI berusaha memberikan jawaban yang
                akurat, informasi dari internet mungkin tidak sepenuhnya valid.
                Harap konsultasikan dengan ahli terkait.`,
    };

    setChatHistory([botMessage]);
  }, []);

  const responseAI = (i) => {
    <Text>{i}</Text>;
  };

  const addMessage = () => {
    if (!input.trim()) return;
    const userMessage = {
      id: Date.now().toString(),
      sender: "user",
      message: input,
    };
    setChatHistory((prevChat) => [userMessage, ...prevChat]);
    axios
      .post(AIRest, {
        userInput: input,
      })
      .then((response) => {
        const botMessage = {
          id: Date.now().toString(),
          sender: "bot",
          message: response.data.response,
        };
        setChatHistory((prevChat) => [botMessage, ...prevChat]);
        const ress = response.data.response;
        // console.log("Response AI", ress);
        setResult(ress);
        setLoading(false);
      })
      .catch((error) => {
        const botMessage = {
          id: Date.now().toString(),
          sender: "bot",
          message:
            "<p>Maaf, saat ini sistem AI kami sedang mengalami kendala teknis yang mempengaruhi kinerja dalam memberikan respons. Kami sedang berupaya memperbaikinya secepat mungkin. Jika pertanyaan Anda mendesak, kami sarankan untuk menggunakan layanan Bantuan Informasi RS agar terhubung dengan layanan dukungan kami secara langsung atau coba lagi nanti. Terima kasih atas kesabaran dan pengertiannya.</p>",
        };
        setChatHistory((prevChat) => [botMessage, ...prevChat]);
        setResult(
          "<p>Maaf, saat ini sistem AI kami sedang mengalami kendala teknis yang mempengaruhi kinerja dalam memberikan respons. Kami sedang berupaya memperbaikinya secepat mungkin. Jika pertanyaan Anda mendesak, kami sarankan untuk menggunakan layanan Bantuan Informasi RS agar terhubung dengan layanan dukungan kami secara langsung atau coba lagi nanti. Terima kasih atas kesabaran dan pengertiannya.</p>"
        );
        console.log(error);
        setLoading(false);
        // console.log("Error AI", error);
      });
    setInput("");
    setLoading(true);
  };
  const { width } = Dimensions.get("window");
  const renderMessageItem = ({ item }) => {
    const isUser = item.sender === "user";
    return (
      <View style={isUser ? [styles.userMessage] : styles.botMessage}>
        <RenderHTML contentWidth={width} source={{ html: item.message }} />
      </View>
    );
  };
  return (
    <>
      <HeaderComponent
        title={"Chat AI"}
        icon={"arrow-back"}
        onPress={() => navigation.replace("Home Screen")}
        rightOnPress={() => {
          Alert.alert(
            "Disklaimer",
            `Disklaimer Penggunaan AI untuk Layanan Tanya Jawab Rumah Sakit
Layanan Tanya Jawab (QnA) ini menggunakan teknologi Kecerdasan Buatan (AI) untuk memberikan informasi terkait kesehatan, prosedur medis, dan layanan yang disediakan oleh rumah sakit. Namun, harap diperhatikan hal-hal berikut:

1.	Bukan Pengganti Konsultasi Medis Profesional
Informasi yang diberikan oleh AI bersifat umum dan hanya bertujuan sebagai panduan. AI tidak menggantikan saran, diagnosis, atau perawatan medis dari tenaga kesehatan profesional. Untuk kondisi kesehatan spesifik atau darurat medis, segera hubungi dokter atau tenaga medis yang berkualifikasi.

2.	Akurasi dan Pembaruan Informasi
Meskipun kami berusaha memberikan informasi yang akurat dan terkini, pengetahuan medis terus berkembang, dan tidak semua informasi yang disampaikan oleh AI mungkin sepenuhnya mencerminkan situasi terkini atau spesifik. Selalu periksa ulang informasi dengan dokter atau staf medis.

3.	Kerahasiaan Data
Kami menjaga kerahasiaan semua data yang Anda berikan sesuai dengan kebijakan privasi rumah sakit dan peraturan yang berlaku. Namun, harap hindari memberikan informasi pribadi atau sensitif yang tidak diperlukan selama interaksi dengan AI.

4.	Batasan Layanan
AI ini tidak dapat merespon situasi darurat medis atau memberikan diagnosis klinis. Dalam keadaan darurat, segera hubungi layanan darurat medis atau kunjungi unit gawat darurat terdekat.

5.	Keterbatasan Jawaban AI
AI dirancang untuk menjawab pertanyaan-pertanyaan umum seputar layanan rumah sakit, namun mungkin tidak dapat menjawab semua pertanyaan Anda. Jika demikian, Anda akan diarahkan untuk berbicara langsung dengan staf medis atau bagian layanan terkait.

Dengan menggunakan layanan ini, Anda setuju bahwa semua informasi yang diberikan oleh AI tidak dijadikan dasar keputusan medis, dan Anda dianjurkan untuk tetap berkonsultasi dengan tenaga medis profesional untuk kebutuhan kesehatan Anda.
`
          );
        }}
        rightIcon={"error-outline"}
      />
      <KeyboardAvoidingView style={styles.chatContainer} behavior="padding">
        <FlatList
          data={chatHistory}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.id}
          inverted
          //   contentContainerStyle={styles.chatContainer}
        />
        <View style={styles.chatInput}>
          <TextInput
            focusable
            onChangeText={setInput}
            value={input}
            style={styles.userInput}
            placeholder={"Pesan Obrolan"}
          />
          {loading ? (
            <ActivityIndicator size={24} color="#004d40" />
          ) : (
            <IconButton
              icon={"send"}
              size={24}
              iconColor={"#004d40"}
              onPress={addMessage}
            />
          )}
        </View>
        <View style={{ alignItems: "center" }}>
          <Text>Supported by Berlianrwnd</Text>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default AIScreen;

const styles = StyleSheet.create({
  chatContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    flex: 1,
    flexDirection: "column",
    // paddingTop: "3%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  contentSection: {
    padding: 20,
    maxHeight: 400,
    overflow: "scroll", // Untuk scroll di React Native, gunakan ScrollView
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    borderRadius: 15,
    marginTop: 20,
  },
  heading1: {
    textAlign: "center",
    color: "#004d40",
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 2,
  },
  heading2: {
    textAlign: "center",
    color: "#00796b",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  chatHistory: {
    flex: 1,
    padding: 15,
    borderColor: "#ddd",
    borderWidth: 1,
    backgroundColor: "#e0f2f1",
    marginBottom: 10,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#b2dfdb",
    color: "#004d40",
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 15,
    maxWidth: "80%",
  },
  userMessage: {
    alignItems: "flex-end",
    alignSelf: "flex-end",
    backgroundColor: "#B1D3DE",
    color: "white",
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 15,
    maxWidth: "80%",
  },
  loader: {
    display: "none", // Loader bisa menggunakan ActivityIndicator di React Native
    width: 40,
    height: 40,
    borderWidth: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 50,
    borderTopColor: "#004d40",
  },
  chatInput: {
    flexDirection: "row",
    alignItems: "center",
    // gap: 5,
  },
  userInput: {
    flex: 1,
    padding: 10,
    marginLeft: "2%",
    borderRadius: 25,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  sendButton: {
    backgroundColor: "#004d40",
    color: "white",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonHover: {
    backgroundColor: "#00251a",
  },
  footerText: {
    textAlign: "center",
    marginTop: 10,
    color: "#666",
    fontSize: 14,
  },
});
