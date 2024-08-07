import { StackActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const initialOffset = 500;

export default function SplashScreen() {
  const offset = useSharedValue(initialOffset);
  const navigation = useNavigation();

  // Calculate the center position
  const screenWidth = Dimensions.get("window").width;
  const boxWidth = 200;
  const centerPosition = (screenWidth - boxWidth) / 2 / 10;

  //   const centerPosition = 10;

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  React.useEffect(() => {
    // Animate the box to the center position
    offset.value = withSpring(centerPosition, {
      mass: 1,
      damping: 10,
      stiffness: 100,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2,
    });
    setTimeout(() => {
      navigation.dispatch(StackActions.replace("Login Screen"));
    }, 4000);
  }, [centerPosition]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyles]}>
        <Image
          resizeMode={"contain"}
          style={{ width: "100%", height: "100%" }}
          source={require("../../../../assets/logo.png")}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  box: {
    height: 150,
    width: 150,
    borderRadius: 20,
    overflow: "hidden", // Ensures the image stays within the rounded corners
    justifyContent: "center", // Centers the image within the box
    alignItems: "center", // Centers the image within the box
  },
});
