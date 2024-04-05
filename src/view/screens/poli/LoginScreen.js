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

  const navigation = useNavigation();
  const keRegist = () => {
    navigation.navigate(HomeScreen);
  };

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
                  selectionColor={'blue'} 
                  placeholder='Email'
                  placeholderTextColor={'grey'}
                  autoCapitalize='none'
                  keyboardType='email-address' 
                />
              </View>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                <TextInput 
                  style={styles.inputan} 
                  selectionColor={'blue'} 
                  placeholder='Password'
                  placeholderTextColor={'grey'}
                  autoCapitalize='none'
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  // keyboardType='password' 
                />
                  <View style={{ position: 'absolute', right: 10 }}>
                    <TouchableOpacity style={styles.showHideButton} onPress={toggleShowPassword}>
                      <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24}/>
                    </TouchableOpacity>
                  </View> 
              </View>
              {/* <TouchableOpacity style={styles.showHideButton} onPress={toggleShowPassword}>
                <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24}/>
                <Text style={{ textAlign: 'right' }}>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
              </TouchableOpacity> */}

              <View style={{ marginBottom: 8, marginTop: 8 }} >
                <ButtonPrimary title='Masuk'/>  
              </View>
              
              <View style={{ flexDirection: 'row'}}>
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
})

export default LoginScreen;