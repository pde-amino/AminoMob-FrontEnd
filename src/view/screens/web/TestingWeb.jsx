import React, { useEffect, useRef, useState } from "react";
import { View, BackHandler, Platform, StatusBar } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";

const WebViewScreen = () => {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
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

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} />
      <WebView
        ref={webViewRef}
        source={{ uri: "http://103.47.60.195:5921/mobileLaporBoss/" }}
        onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
      />
    </View>
  );
};

export default WebViewScreen;
