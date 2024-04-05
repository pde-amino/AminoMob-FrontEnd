import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const ButtonSecondary = ({title}) => (
  <Button 
    textColor='blue'
    mode='outlined' 
    labelStyle={styles.labelStyle}
    style={styles.buttonStyle}
    onPress={() => console.log('Success 200')}>
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
        borderColor: 'blue',
    }
})

export default ButtonSecondary;