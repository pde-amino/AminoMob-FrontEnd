import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const ButtonPrimary = ({title}) => (
  <Button 
    buttonColor='blue'
    mode="contained" 
    labelStyle={styles.labelStyle}
    style={styles.buttonStyle}
    onPress={() => console.log('Pressed')}>
        {title}
  </Button>
);

const styles = StyleSheet.create({
    labelStyle: {
        fontSize: 16,
    },
    buttonStyle: {
        borderRadius: 10,
        height: 40,
    }
})

export default ButtonPrimary;