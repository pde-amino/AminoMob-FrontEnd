import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = (mode, onChange) => {
  //   const { defaultDate, onDateChange } = props;
  //   const [date, setDate] = useState(new Date(defaultDate));
  const [show, setShow] = useState(false);

  //   const onChange = (e, selectedDate) => {
  //     setDate(new Date(selectedDate));
  //   };

  //   const onIOSChange = (e, selectedDate) => {
  //     setShow(false);
  //     if (selectedDate) {
  //       setDate(new Date(selectedDate));
  //     }
  //   };

  //   const renderDatePicker = () => {
  //     return (
  //       <>
  //         <DateTimePicker
  //           display={Platform.OS === "android" ? "spinner" : "default"}
  //           timeZoneOffsetInMinutes={0}
  //           value={new Date()}
  //           mode="date"
  //           minimumDate={new Date(1920, 10, 10)}
  //           maximumDate={new Date()}
  //           onChange={Platform.OS === "android" ? onChange : onIOSChange}
  //         />
  //       </>
  //     );
  //   };

  return (
    // <RNDateTimePicker display="calendar" mode="date" value={new Date()} />
    <DateTimePicker
      //   setVisible={setVisible}
      //   display="spinner"
      //   display={Platform.OS === "android" ? "default" : "default"}
      timeZoneOffsetInMinutes={0}
      value={new Date()}
      mode={mode}
      minimumDate={new Date()}
      //   maximumDate={new Date()}
      onChange={onChange}
    />
    // <Pressable
    //   style={styles.box}
    //   onPress={() => setShow(true)}
    //   activeOpacity={0}
    // >
    //   <View>
    //     <Text>{`${date.getFullYear()}T${
    //       date.getMonth() + 1
    //     }${date.getDate()}`}</Text>
    //     {Platform.OS !== "android" && show && renderDatePicker()}
    //   </View>
    // </Pressable>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  //   box: {
  //     width: 120,
  //     backgroundColor: "white",
  //   },
});
