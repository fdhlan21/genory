import { View, Text, ImageBackground, Image, TouchableNativeFeedback, ScrollView, Alert, Linking, TouchableOpacity } from 'react-native'
import React from 'react'
import { fonts, colors } from '../../utils'
import { MySecondPicker } from '../../components'
import { Icon } from 'react-native-elements'
import { useState } from 'react'
import { showMessage } from 'react-native-flash-message'
import { useEffect } from 'react'
import axios from 'axios'
import { apiURL } from '../../utils/localStorage'

export default function KeduaNextSlide({ navigation }) {
    const [selectedProgram, setSelectedProgram] = useState(null); // State untuk menyimpan program yang dipilih
    const [isProgramSelected, setIsProgramSelected] = useState(false); // State untuk melacak apakah sudah memilih program


    const [medsos, setMedsos] = useState({
        instagram: '',
        tiktok: '',
        whatsapp: '',
    });
    const __GetMedsos = () => {
        axios.post(apiURL + 'medsos').then(res => {
            console.log(res.data);
            setMedsos(res.data)
        })
    }

    useEffect(() => {
        __GetMedsos();
    }, [])


    const handleProgramChange = (value) => {
        setSelectedProgram(value); // Update nilai yang dipilih
        setIsProgramSelected(true);
        console.log("Kamu Memilih : ", value)
    };

    const handleNextSlide = () => {
        if (isProgramSelected) {
            if (selectedProgram === 'Weight Gain Program') {
                navigation.navigate('GainRegister', {
                    tipe: 'Gain'
                });
            } else if (selectedProgram === 'Weight Loss Program') {
                navigation.navigate('GainRegister', {
                    tipe: 'Loss'
                });
            }
        } else {
            showMessage({
                type: 'danger',
                backgroundColor: colors.white,
                color: colors.danger,
                message: 'Mohon pilih program terlebih dahulu',
                position: "top",

            })
        }
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <ImageBackground source={require('../../assets/bgimg.png')} style={{
                flex: 1,
                width: '100%',
                height: '100%'

            }}>
                <ScrollView>
                    <View style={{
                        padding: 10,
                    }}>

                        <View style={{
                            marginTop: 70,
                            alignItems: "center"
                        }}>
                            <View style={{
                                width: 310
                            }}>
                                <Text style={{
                                    fontFamily: fonts.primary[500],
                                    textAlign: "center",
                                    fontSize: 15,
                                    color: colors.primary
                                }}>Wujudkan Body Goalmu dengan Genory!
                                    Pilih Programmu Sekarang!</Text>
                            </View>
                        </View>

                        <View style={{
                            alignItems: "center"
                        }}>
                            <MySecondPicker
                                value={selectedProgram}
                                onChange={handleProgramChange}
                                label="Pilih Program"
                                data={[
                                    { label: 'Weight Gain Program', value: 'Weight Gain Program' },
                                    { label: 'Weight Loss Program', value: 'Weight Loss Program' },
                                ]} />
                        </View>

                        <View style={{
                            alignItems: 'center',
                            marginTop: 0,
                        }}>
                            <Image style={{
                                width: 254,
                                height: 387,
                                top:-10

                            }} source={require('../../assets/foto_tiga.png')} />
                        </View>



                        <View style={{
                            alignItems: 'center',
                            marginTop: 10
                        }}>
                            <TouchableNativeFeedback onPress={handleNextSlide}>
                                <View style={{
                                    padding: 10,
                                    backgroundColor: colors.primary,
                                    width: 310,
                                    borderRadius: 30,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    justifyContent: "center"

                                }}>
                                    <Text style={{
                                        fontFamily: fonts.primary[500],
                                        fontSize: 15,
                                        color: colors.white,
                                        textAlign: "center",
                                        top: 1.5
                                    }}>Selanjutnya</Text>

                                    <Icon type='ionicon' name='chevron-forward-outline' size={20} color={colors.white} />

                                </View>


                            </TouchableNativeFeedback>
                        </View>







                        {/* end */}

                        <View>
                            <View style={{
                                alignItems: 'center',
                                marginTop: 20
                            }}>
                                <Image style={{
                                    width: 73,
                                    height: 29,
                                }} source={require('../../assets/genory.png')} />
                            </View>

                            <View style={{}}>
                                <Text style={{
                                    fontFamily: fonts.primary[500],
                                    fontSize: 15,
                                    textAlign: "center",
                                    color: colors.primary,
                                }}>Make The Look You Want With, Genory!</Text>
                            </View>

                            <View style={{
                                alignItems: 'center',
                                marginTop: 20,
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    alignItems: "center",
                                    width: 159
                                }}>

                                    <TouchableOpacity onPress={() => Linking.openURL(medsos.instagram)}>
                                        <Image
                                            style={{ width: 24, height: 24 }}
                                            source={require('../../assets/instagram.png')}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => Linking.openURL(medsos.whatsapp)}>
                                        <Image
                                            style={{ width: 24, height: 24 }}
                                            source={require('../../assets/WA.png')}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => Linking.openURL(medsos.tiktok)}>
                                        <Image
                                            style={{ width: 24, height: 24 }}
                                            source={require('../../assets/tiktok.png')}
                                        />
                                    </TouchableOpacity>

                                </View>
                            </View>


                            <View style={{
                                alignItems: 'center',
                                marginTop: 60,
                            }}>
                                <Text style={{ fontFamily: fonts.primary[500], color: colors.primary, textAlign: 'center', fontSize: 12 }}>© <Text style={{ fontFamily: fonts.primary[800] }}> 2024</Text> GENORY. All Right Reserved</Text>
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    )
}