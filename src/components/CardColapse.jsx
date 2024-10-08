import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import GlobalStyles from "../style/GlobalStyles";
import { Icon } from "react-native-paper";

const CardColapse = ({ title, subtitle, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    if (isExpanded) {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        toValue: contentHeight, // or some other value based on content height
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    setIsExpanded(!isExpanded);
  };

  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  };

  useEffect(() => {
    if (isExpanded) {
      Animated.timing(animatedHeight, {
        toValue: contentHeight,
        duration: 0,
        useNativeDriver: false,
      }).start();
    }
  }, [contentHeight, isExpanded]);

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <View>
          <Text style={GlobalStyles.textBiasa}>{title}</Text>
          <Text style={GlobalStyles.h4}>{subtitle}</Text>
        </View>
        {isExpanded ? (
          <Icon source="chevron-up" color="#3E3E3E" size={24} />
        ) : (
          <Icon source="chevron-down" color="#3E3E3E" size={24} />
        )}
      </TouchableOpacity>
      <Animated.View style={[styles.content, { height: animatedHeight }]}>
        <View onLayout={handleLayout} style={styles.innerContent}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  header: {
    padding: 15,
    backgroundColor: "#E1F0FF",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    overflow: "hidden",
  },
  innerContent: {
    padding: 12,
  },
});

export default CardColapse;
