import * as React from "react";
import { Image, Text } from "react-native";
import { Banner, Icon } from "react-native-paper";

const BannerComponent = ({
  visible,
  pressKiri,
  pressKanan,
  content,
  bannerStyle,
  textStyle,
  colorIcon,
}) => {
  return (
    <Banner
      visible={visible}
      // actions={[
      //   {
      //     label: "Fix it",
      //     onPress: { pressKiri },
      //   },
      //   {
      //     label: "Learn more",
      //     onPress: { pressKanan },
      //   },
      // ]}
      icon={() => <Icon source="alert-circle" size={32} color={colorIcon} />}
      elevation={1}
      contentStyle={bannerStyle}
    >
      <Text style={textStyle}>{content}</Text>
    </Banner>
  );
};

export default BannerComponent;
