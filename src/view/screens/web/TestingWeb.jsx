import React, { useEffect, useRef, useState } from "react";
import { View, BackHandler, StatusBar, PermissionsAndroid } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { CHAT_AI, LAPOR_AMINO } from "../../../contex/Config";
import { StatusBar } from "expo-status-bar";

const WebViewScreen = () => {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [error, setError] = useState(false);
  const navigation = useNavigation();
  const [cameraPermission, setCameraPermission] = useState(false);
  const [storagePermission, setStoragePermission] = useState(false);

  const requestCameraAndStoragePermission = async () => {
    try {
      // Meminta izin kamera
      const cameraGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "We need access to your camera to take photos",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );

      // Meminta izin penyimpanan
      const storageGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message: "We need access to your media storage to select images",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );

      if (
        cameraGranted === PermissionsAndroid.RESULTS.GRANTED &&
        storageGranted === PermissionsAndroid.RESULTS.GRANTED
      ) {
        Alert.alert("Camera and Storage permissions granted");
      } else {
        Alert.alert("Permissions denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    // if (Platform.OS === "android") {
    //   requestCameraAndStoragePermission();
    // }
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

  const customUserAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} />
      <WebView
        originWhitelist={["http://103.47.60.195:5921"]}
        ref={webViewRef}
        source={{ uri: "http://103.47.60.195:5921/mobileLaporBoss/" }}
        onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
        // javaScriptEnabled={false}
        cacheEnabled={false}
      />
    </View>
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

export default WebViewScreen;
