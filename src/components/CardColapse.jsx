import React, { useState, useRef } from "react";
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
        toValue: 120, // or some other value based on content height
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <View>
          <Text>{title}</Text>
          <Text style={GlobalStyles.h4}>{subtitle}</Text>
        </View>
        {isExpanded ? (
          <Icon source="chevron-up" size={24} />
        ) : (
          <Icon source="chevron-down" size={24} />
        )}
      </TouchableOpacity>
      <Animated.View style={[styles.content, { height: animatedHeight }]}>
        {isExpanded && <View style={styles.innerContent}>{children}</View>}
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
    backgroundColor: "#C5E1FC",
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
