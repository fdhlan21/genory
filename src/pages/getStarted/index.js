import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  TouchableNativeFeedback,
  Animated,
  Dimensions,
  PanResponder,
  Linking,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import { colors, fonts } from '../../utils';
import { apiURL, getData, webURL } from '../../utils/localStorage';
import axios from 'axios';

export default function GetStarted({ navigation }) {
  const screenWidth = Dimensions.get('window').width;
  const maxSlide = screenWidth - 100;  // Batas slide panah
  const [data, setData] = useState([
    {
      id: 1,
      gambar: ''
    }
  ]);
  const [medsos, setMedsos] = useState({
    instagram: '',
    tiktok: '',
    whatsapp: '',
  });

  const banner = [
    { id: 1, image: require('../../assets/banner_getstarted.png') },
    { id: 2, image: require('../../assets/banner_getstarted2.png') },
    { id: 3, image: require('../../assets/banner_getstarted3.png') },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const arrowPosition = useRef(new Animated.Value(0)).current;

  const backgroundColor = arrowPosition.interpolate({
    inputRange: [0, maxSlide], // Batas posisi panah agar tidak melampaui layar
    outputRange: [colors.primary, colors.primary], // Tetap warna primary
  });
  const [user, setUser] = useState({});

  const textOpacity = arrowPosition.interpolate({
    inputRange: [0, 30],
    outputRange: [1, 0],
  });

  const __GetSlider = () => {
    axios.post(apiURL + 'slider', {
      posisi: 'Opening'
    }).then(res => {
      console.log(res.data);
      setData(res.data)
    })
  }

  const __GetMedsos = () => {
    axios.post(apiURL + 'medsos').then(res => {
      console.log(res.data);
      setMedsos(res.data)
    })
  }

  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
      // console.log(res)
    })
    __GetSlider();
    __GetMedsos();
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % banner.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handleMove = Animated.event(
    [
      null,
      { dx: arrowPosition },
    ],
    { useNativeDriver: false }
  );

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      // Mengatur posisi panah agar tidak melampaui batas
      const offsetX = gestureState.dx < 0 ? 0 : (gestureState.dx > maxSlide ? maxSlide : gestureState.dx);
      arrowPosition.setValue(offsetX);
    },
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dx >= maxSlide) {
        // Jika panah sudah sampai batas, pindahkan ke halaman berikutnya
        navigation.navigate('TargetBerat');
      } else {
        // Kembalikan posisi panah ke awal
        Animated.spring(arrowPosition, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <ImageBackground
        source={require('../../assets/bgimg.png')}
        style={{ flex: 1, width: '100%', height: '100%' }}
      >
        <ScrollView>
          <View style={{ padding: 0 }}>

            <View style={{ alignItems: 'center' }}>
              <Image
                style={{
                  width: '100%',
                  height: 456,
                  resizeMode: 'cover',
                }}
                source={{
                  uri: webURL + data[currentImageIndex].gambar
                }}
              />
            </View>

            <View style={{ alignItems: 'center', marginTop: 12 }}>
              <View style={{ width: 310 }}>
                <Text
                  style={{
                    fontFamily: fonts.primary[700],
                    color: colors.primary,
                    fontSize: 25,
                    textAlign: 'center',
                  }}
                >
                  Raih Target Badanmu!
                </Text>

                <Text
                  style={{
                    fontFamily: fonts.primary[400],
                    color: colors.black,
                    fontSize: 15,
                    textAlign: 'center',
                  }}
                >
                  Secara sehat dan efektif, melalui program khusus buat kamu
                </Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('RingkasanRencana')}>
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Animated.View
                  style={{
                    padding: 10,
                    backgroundColor: backgroundColor,
                    width: 310,
                    height: 55,
                    borderRadius: 30,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  {...panResponder.panHandlers}  // Menambahkan panResponder ke view panah
                >
                  <Animated.Image
                    style={{
                      width: 44,
                      height: 44,
                      marginLeft: arrowPosition,
                    }}
                    source={require('../../assets/arror_roundfill.png')}
                  />

                  <Animated.Text
                    style={{
                      fontFamily: fonts.primary[600],
                      fontSize: 25,
                      color: colors.white,
                      marginRight: '38%',
                      opacity: textOpacity,
                    }}
                  >
                    Mulai
                  </Animated.Text>
                </Animated.View>
              </View>

            </TouchableOpacity>

            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Image
                style={{ width: 73, height: 29 }}
                source={require('../../assets/genory.png')}
              />
            </View>

            <View>
              <Text
                style={{
                  fontFamily: fonts.primary[500],
                  fontSize: 15,
                  textAlign: 'center',
                  color: colors.primary,
                }}
              >
                Make The Look You Want With, Genory!
              </Text>
            </View>

            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  width: 159,
                }}
              >
                <TouchableNativeFeedback onPress={() => Linking.openURL(medsos.instagram)}>
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={require('../../assets/instagram.png')}
                  />
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={() => Linking.openURL(medsos.whatsapp)}>
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={require('../../assets/WA.png')}
                  />
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={() => Linking.openURL(medsos.tiktok)}>
                  <Image
                    style={{ width: 24, height: 24 }}
                    source={require('../../assets/tiktok.png')}
                  />
                </TouchableNativeFeedback>
              </View>
            </View>

            <View style={{ alignItems: 'center', marginTop: 25 }}>
              <Text
                style={{
                  fontFamily: fonts.primary[500],
                  color: colors.primary,
                  textAlign: 'center',
                  fontSize: 12,
                }}
              >
                © <Text style={{ fontFamily: fonts.primary[800] }}> 2024</Text>{' '}
                GENORY. All Right Reserved
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View >
  );
}
