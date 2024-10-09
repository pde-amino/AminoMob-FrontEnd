import React, { useEffect, useRef, useState } from "react";
import {
  View,
  BackHandler,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { CHAT_AI } from "../../../contex/Config";
import { StatusBar } from "expo-status-bar";

const ChatAI = () => {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [error, setError] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const onBackPress = () => {
      if (canGoBack) {
        webViewRef.current.goBack();
        return true;
      } else {
        navigation.navigate("Home Screen");
        return true;
      }
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    };
  }, [canGoBack]);

  // Function to reload the WebView
  // const reloadWebView = () => {
  //   setError(false); // Reset error state
  //   webViewRef.current.reload(); // Reload WebView
  // };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}>
      {error ? (
        // If an error occurs, show a friendly error message
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Oops! Halaman Chat Otomatis sedang dalam pemeliharaan.
          </Text>
          <Text style={styles.errorText}>Coba lagi nanti.</Text>
          {/* <Button title="Coba Lagi" onPress={reloadWebView} /> */}
        </View>
      ) : (
        // Show WebView if there's no error
        <WebView
          ref={webViewRef}
          source={{ uri: CHAT_AI }}
          onNavigationStateChange={(navState) =>
            setCanGoBack(navState.canGoBack)
          }
          onError={() => setError(true)} // Handle general network errors
          onHttpError={() => setError(true)} // Handle HTTP errors
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default ChatAI;
