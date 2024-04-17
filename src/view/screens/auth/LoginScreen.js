import React, {useState} from 'react'
import { Text, View, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ButtonPrimary from '../../../components/ButtonPrimary'
import HomeScreen from '../home/HomeScreen'
import { Ionicons } from "react-native-vector-icons";

const LoginScreen = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const navigation = useNavigation();

  const keRegist = () => {
    navigation.navigate(HomeScreen); //harus diubah ke halaman pendaftaran
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (text) => {
    // Cek apakah teks password mengandung karakter khusus
    const containsSpecialChar = /[!@#$%^&*()_=+\-\[\]{};':"\\|,.<>\/?]/.test(text);
    if (containsSpecialChar) {
      setPasswordError('Gak boleh pakai karakter itu');
    } else {
      setPasswordError('');
    }
    setPassword(text);
  };

  const isDisabled = !password || !!passwordError;

    return (
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps='handled'
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
                  selectionColor={'blue'} 
                  placeholder='No. Handphone/ No. RM'
                  placeholderTextColor={'grey'}
                  autoCapitalize='none'
                  keyboardType='email-address' 
                />
              </View>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                <TextInput 
                  style={[styles.inputan, passwordError && styles.inputError]} 
                  selectionColor={'blue'} 
                  placeholder='Password'
                  placeholderTextColor={'grey'}
                  autoCapitalize='none'
                  secureTextEntry={!showPassword}
                  value={password}
                  // onChangeText={setPassword}
                  onChangeText={handlePasswordChange}
                  // keyboardType='password' 
                />

                {/* icon mata */}
                  <View style={{ position: 'absolute', right: 10 }}>
                    <TouchableOpacity style={styles.showHideButton} onPress={toggleShowPassword}>
                      <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24}/>
                    </TouchableOpacity>
                  </View> 
              </View>

              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

              {/* <TouchableOpacity style={styles.showHideButton} onPress={toggleShowPassword}>
                <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24}/>
                <Text style={{ textAlign: 'right' }}>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
              </TouchableOpacity> */}

              <View style={{ marginBottom: 8, marginTop: 8, alignItems: 'center',}} >
                <ButtonPrimary title='Masuk' disabled={isDisabled}/>  
              </View>
              
              <View style={{ flexDirection: 'row', }}>
                <Text>Belum Punya akun?</Text>
                <TouchableOpacity>
                  <Text style={{color:'blue', textDecorationLine:'underline' }} onPress={keRegist}> Daftar Sekarang</Text>
                  </TouchableOpacity>
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
      padding: 10,
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
    errorText: {
      color: 'red',
      fontSize: 12,
      marginTop: 5,
      marginBottom: 15,
      marginLeft: 5,
    },
    inputError:{
      borderColor: 'red',
    }
})

export default LoginScreen;