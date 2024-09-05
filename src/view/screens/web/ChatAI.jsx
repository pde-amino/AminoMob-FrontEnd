import React, { useEffect, useRef, useState } from "react";
import { View, BackHandler, Platform } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { CHAT_AI } from "../../../contex/Config";

const ChatAI = (source) => {
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
      <WebView
        ref={webViewRef}
        source={{ uri: CHAT_AI }}
        onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
      />
    </View>
  );
};

export default ChatAI;
