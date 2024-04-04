import React, {useState} from 'react'
import { Text, View, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import ButtonPrimary from '../../../components/ButtonPrimary'
import ButtonSecondary from '../../../components/ButtonSecondary'

const LoginScreen = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
    return (
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center'
          }}>

          <KeyboardAvoidingView enabled>
            <View>
              <View >
                <Text style={styles.judul}>Login</Text>
              </View>

              <View>
                <TextInput 
                  style={styles.inputan} 
                  selectionColor={'red'} 
                  placeholder='Email'
                  placeholderTextColor={'grey'}
                  autoCapitalize='none'
                  keyboardType='email-address' 
                />
              </View>
              <View>
                <TextInput 
                  style={styles.inputan} 
                  selectionColor={'red'} 
                  placeholder='Password'
                  placeholderTextColor={'grey'}
                  autoCapitalize='none'
                  secureTextEntry={!showPassword}
                  keyboardType='password' 
                />
              </View>
              <TouchableOpacity style={styles.showHideButton} onPress={toggleShowPassword}>
                <Text>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
              </TouchableOpacity>

              <View style={{ marginBottom: 8 }} >
                <ButtonPrimary title='Masuk'/>  
              </View>
              
              <View>
                <Text>Belum Punya akun?
                  <TouchableOpacity>
                  <Text style={{color:'blue', textDecorationLine:'underline'}}> Daftar</Text>
                  </TouchableOpacity>
                </Text>
                
              </View>
            </View>  
          </KeyboardAvoidingView>

        </ScrollView>
      </View>
    )
      
  }



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    judul: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'navy',
        marginBottom: 10
    },
    inputan: {
      height: 48,
      width: 350,
      borderWidth: 1,
      padding: 8,
      margin: 4,
      paddingHorizontal: 10,
      backgroundColor: 'white',
      borderRadius: 8
    },
    showHideButton: {
      padding: 5,
    },
    tombol: {
      marginTop: 10,
      ackgroundColor: '#007bff',
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderRadius: 8,
      width: '100%',
      alignItems: 'center',
    },
})

export default LoginScreen;