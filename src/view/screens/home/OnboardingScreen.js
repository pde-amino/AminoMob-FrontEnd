import React from 'react'
import { SafeAreaView, StyleSheet, Dimensions, 
    ImageBackground, FlatList, View, Image, Text, StatusBar, 
    TouchableOpacity} from 'react-native'
import ButtonPrimary from '../../../components/ButtonPrimary'
import ButtonSecondary from '../../../components/ButtonSecondary'
import HomeScreen from './HomeScreen'
import { useNavigation } from '@react-navigation/native'

const {width, height} = Dimensions.get('window')

const WARNA = {primary: '#0A78E2', white: '#fff'}

const slides = [
    {
        id: '1',
        image: require('../../../../assets/onboard1.png'),
        title: 'Selamat Datang di Amino Apps',
        subtitle: 'Satu aplikasi untuk semua keperluan di Amino Hospital'
    },
    {
        id: '2',
        image: require('../../../../assets/onboard2.png'),
        title: 'Pusat Kesehatan Jiwa di Semarang',
        subtitle: 'Pasien'
    },
    {
        id: '3',
        image: require('../../../../assets/onboard3.png'),
        title: 'Buat Akun Sekarang',
        subtitle: 'Ini subtitle kedua'
    },
]

const Slide = ({item}) => {
    return (
        <View style={{alignItems: 'center'}}>
            <Image source={item.image} style={{height: '70%', width, resizeMode: 'contain'}} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
    )
}

const OnboardingScreen = ({navigation}) => {
    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
    const ref = React.useRef(null)
    
    
    const Footer = () => {
    return (
        // Indikator slider
        <View style={{
            height: height * 0.25,
            justifyContent: 'space-between',
            paddingHorizontal: 20, 
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 20,
            }}>
                {slides.map((_,index) => (
                    <View key={index} 
                    style={[styles.indicator, currentSlideIndex == index && {
                        backgroundColor: WARNA.white, 
                        width: 25,
                    },
                ]}
                />
                ))}
            </View>

            {/* button next dan skip */}
            <View style={{marginBottom: 20}}>
                {
                    currentSlideIndex == slides.length - 1 ? 
                    <View style={{height: 48}}>
                    <TouchableOpacity style={[styles.btn]} 
                    onPress={() => navigation.navigate('HomeScreen')}>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>
                        MULAI
                        </Text>
                    </TouchableOpacity>
                </View> 
                 : 
                (<View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={[styles.btn, {
                        backgroundColor: 'transparent', 
                        borderWidth: 1, 
                        borderColor: WARNA.white}
                    ]} onPress={skip}>
                        <Text style={{fontWeight: 'bold', fontSize: 16, color: WARNA.white}}>LEWATI</Text>
                    </TouchableOpacity>
                    <View style={{width: 16}}/>
                    <TouchableOpacity style={[styles.btn]} onPress={nextSlide}>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>LANJUT</Text>
                    </TouchableOpacity>
                </View>
                )}
            </View>
        </View>
    )
   };

   const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width)
    setCurrentSlideIndex(currentIndex)
   }

   const nextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
        const offset = nextSlideIndex * width;
        ref?.current?.scrollToOffset({offset});
        setCurrentSlideIndex(nextSlideIndex);
    }
   }

   const skip = () => {
    const lastSlideIndex = slides.length - 1
    const offset = lastSlideIndex * width
    ref?.current?.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
    }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: WARNA.primary}}>
        <StatusBar backgroundColor={WARNA.primary} />
        <FlatList 
            ref={ref}
            onMomentumScrollEnd={updateCurrentSlideIndex}
            pagingEnabled
            data={slides} 
            contentContainerStyle={{height: height * 0.75}} 
            horizontal
            showsHorizontalScrollIndicator={false} 
            renderItem={({item}) => <Slide item={item} />}  
        />
        <Footer/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    title: {
        color: WARNA.white,
        fontSize: 24,
        fontWeight: 'bold',
        maxWidth: '75%',
        textAlign: 'center',

    },
    subtitle: {
        color: WARNA.white,
        fontSize: 14,
        maxWidth: '75%',
        marginTop: 12,
        textAlign: 'center',
    },
    indicator: {
        height: 3,
        width: 8,
        backgroundColor: '#ADADAD',
        marginHorizontal: 4,
        borderRadius: 2,
        marginTop: 12,
    },
    btn: {
        flex: 1,
        backgroundColor: WARNA.white,
        height: 48,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default OnboardingScreen
