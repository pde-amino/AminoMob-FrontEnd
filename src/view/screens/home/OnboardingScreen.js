import React from 'react'
import { SafeAreaView, StyleSheet, Dimensions, 
    ImageBackground, FlatList, View, Image, Text, StatusBar } from 'react-native'

const {width, height} = Dimensions.get('window')

const WARNA = {primary: '#cc338b', white: '#fff', red: '#FF0000'}

const slides = [
    {
        id: '1',
        image: require('../../../../assets/Frame 12.png'),
        title: 'Selamat Datang di Amino Apps',
        subtitle: 'Satu aplikasi untuk semua keperluan di Amino Hospital'
    },
    {
        id: '2',
        image: require('../../../../assets/adaptive-icon.png'),
        title: 'Buat Akun Sekarang',
        subtitle: 'Ini subtitle kedua'
    },
    {
        id: '3',
        image: require('../../../../assets/Frame 12.png'),
        title: 'Pusat Informasi Kesehatan Jiwa',
        subtitle: 'Ini subtitle kedua'
    },
]

const Slide = ({item}) => {
    return (
        <View style={{alignItems: 'center'}}>
            <Image source={item.image} style={{height: '75%', width, resizeMode: 'contain'}} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
    )
}

const OnboardingScreen = ({navigation}) => {
    const Footer = () => {
        return (
            <View style={{height: height * 0.25, justifyContent: 'space-between',paddingHorizontal: 15}}>
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                    {slides.map((_,index) => (
                        <View key={index} style={[styles.indicator]}/>
                    ))}
                </View>
            </View>
        ) 
    }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: WARNA.primary}}>
        {/* <StatusBar backgroundColor={WARNA.black} /> */}
        <FlatList pagingEnabled
            data={slides} 
            contentContainerStyle={{height: height * 0.75}} 
            horizontal
            showsHorizontalScrollIndicator={false} 
            renderItem={({item}) => <Slide item={item} />}  
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    title: {
        color: WARNA.white,
        fontSize: 28,
        fontWeight: 'bold',
        maxWidth: '80%',
        marginTop: 10,
        textAlign: 'center',

    },
    subtitle: {
        color: WARNA.white,
        fontSize: 18,
        maxWidth: '75%',
        marginTop: 20,
        textAlign: 'center',
    },
    indicator: {
        height: 25,
        width: 10,
        backgroundColor: 'white',
        marginHorizontal: 3,
        borderRadius: 2,
    }
})

export default OnboardingScreen
