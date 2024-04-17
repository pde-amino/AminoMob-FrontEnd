import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const ButtonPrimary = ({title, disabled}) => (
  <Button 
    buttonColor='#cc338b'
    mode="contained" 
    labelStyle={styles.labelStyle}
    style={[styles.buttonStyle, disabled && styles.disabledButton]}
    onPress={() => console.log('Pressed')}
    disabled={disabled}>
        {title}
  </Button>
);

const styles = StyleSheet.create({
    labelStyle: {
        fontSize: 16,
    },
    buttonStyle: ({
        borderRadius: 10,
        height: 42,
        width: 350,
    }),
    disabledButton: {
        opacity: 1,
    }
})

export default ButtonPrimary;