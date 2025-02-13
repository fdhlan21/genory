import { View, Text, ScrollView, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { colors, fonts } from '../../utils'
import { MyCalendar, MyGap, MyInput, MyPicker } from '../../components'
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
import { api_token, apiURL, storeData } from '../../utils/localStorage';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';

export default function GainRegister({ navigation, route }) {
    const [selectedGender, setSelectedGender] = useState(null); // State untuk menyimpan program yang dipilih
    const [isGenderelected, setIsGenderSelected] = useState(false); // State untuk melacak apakah sudah memilih program
    const handleProgramChange = (value) => {
        setSelectedGender(value); // Update nilai yang dipilih
        setIsGenderSelected(true);
        console.log("Kamu Memilih : ", value)
    };

    const toast = useToast();

    const TIPE = route.params.tipe;


    const [kirim, setKirim] = useState({
        api_token: api_token,
        nama: '',
        jenis_kelamin: 'Laki-laki',
        tanggal_lahir: moment().format('YYYY-MM-DD'),
        email: '',
        telepon: '',
        password: '',
        tinggi_badan: '',
        berat_badan: '',
    });

    const hitungIMT = (beratBadan, tinggiBadanCm) => {
        // Konversi tinggi badan dari centimeter ke meter
        const tinggiBadanMeter = tinggiBadanCm / 100;

        // Hitung IMT menggunakan rumus
        const imt = beratBadan / (tinggiBadanMeter ** 2);

        // Klasifikasi IMT
        let klasifikasi;
        if (imt < 18.5) {
            klasifikasi = "Kurus";
        } else if (imt >= 18.5 && imt < 25) {
            klasifikasi = "Normal";
        } else if (imt >= 25 && imt < 30) {
            klasifikasi = "Gemuk";
        } else {
            klasifikasi = "Sangat Gemuk";
        }

        // Return hasil IMT dengan klasifikasi
        return {
            imt: imt.toFixed(2),
            klasifikasi: klasifikasi,
        };
    }

    const handleKirim = () => {

        if (kirim.nama.length == '' || kirim.jenis_kelamin == false || kirim.email.length == '' || kirim.telepon.length == '' || kirim.password.length == '' || kirim.tinggi_badan.length == '' || kirim.berat_badan.length == '') {
            showMessage({
                type: 'danger',
                position: "top",
                backgroundColor: "white",
                color: colors.danger,
                message: "Mohon isi semua field!"
            });
        } else if (kirim.nama.length == '') {
            showMessage({
                type: 'danger',
                position: "top",
                backgroundColor: "white",
                color: colors.danger,
                message: "Nama belum di isi!"
            });
        } else if (kirim.email.length == '') {
            showMessage({
                type: 'danger',
                position: "top",
                backgroundColor: "white",
                color: colors.danger,
                message: "Email belum di isi!"
            });
        } else if (kirim.telepon.length == '') {
            showMessage({
                type: 'danger',
                position: "top",
                backgroundColor: "white",
                color: colors.danger,
                message: "Nomor Telepon belum di isi!"
            });
        } else if (kirim.password.length == '') {
            showMessage({
                type: 'danger',
                position: "top",
                backgroundColor: "white",
                color: colors.danger,
                message: "Password belum di isi!"
            });
        } else if (kirim.berat_badan.length == '') {
            showMessage({
                type: 'danger',
                position: "top",
                backgroundColor: "white",
                color: colors.danger,
                message: "Berat Badan belum di isi!"
            });
        } else if (kirim.tinggi_badan.length == '') {
            showMessage({
                type: 'danger',
                position: "top",
                backgroundColor: "white",
                color: colors.danger,
                message: "Tinggi Badan belum di isi!"
            });
        } else {


            let imt = hitungIMT(kirim.berat_badan, kirim.tinggi_badan);



            axios
                .post(apiURL + 'register', {
                    ...kirim,
                    imt: imt.imt,
                    hasil: imt.klasifikasi,
                    tipe: TIPE,
                })
                .then(response => {
                    console.log(response.data)
                    if (response.data.status == 404) {

                        toast.show(response.data.message, {
                            type: 'danger'
                        })
                    } else if (response.data.status == 200) {
                        storeData('user', response.data.data)
                        navigation.replace('GetStarted', {
                            ...kirim,
                            imt: imt.imt,
                            hasil: imt.klasifikasi,
                            tipe: TIPE,
                        });
                        toast.show(response.data.message, {
                            type: 'success'
                        })
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }

    return (
        <View style={{
            flex: 1
        }}>
            <ImageBackground source={TIPE == 'Gain' ? require('../../assets/bgimg.png') : require('../../assets/bgloss.png')} style={{
                width: '100%',
                height: "100%",
                flex: 1
            }}>
                <ScrollView>
                    <View style={{
                        padding: 10
                    }}>

                        <View style={{
                            alignItems: 'center',
                            marginTop: 20
                        }}>
                            <View style={{
                                width: '90%',
                            }}>
                                <Text style={{
                                    fontFamily: fonts.primary[600],
                                    fontSize: 18,
                                    color: TIPE == 'Gain' ? colors.primary : colors.lossColor,
                                    textAlign: 'center',

                                }}>
                                    Weight {TIPE} Program
                                </Text>
                                <Text style={{
                                    fontFamily: fonts.primary[400],
                                    fontSize: 18,
                                    color: TIPE == 'Gain' ? colors.primary : colors.lossColor,
                                    textAlign: 'center',

                                }}>
                                    Silahkan isi data di bawah ini
                                    untuk mengikuti
                                </Text>
                            </View>
                        </View>


                        {/* FORM */}

                        <View style={{
                            padding: 10,
                        }}>


                            <MyInput borderColor={TIPE == 'Gain' ? colors.primary : colors.lossColor} value={kirim.nama}
                                placeholder="Isi Nama"
                                backgroundColor='#F7F7F7'
                                label="Nama"
                                onChangeText={(x) => setKirim({ ...kirim, 'nama': x })}
                            />

                            <MyPicker
                                borderColor={TIPE == 'Gain' ? colors.primary : colors.lossColor}
                                onChange={x => setKirim({
                                    ...kirim,
                                    jenis_kelamin: x
                                })}
                                value={kirim.jenis_kelamin}
                                label="Pilih Jenis Kelamin"
                                backgroundColor='#F7F7F7'
                                data={[
                                    { label: 'Laki-laki', value: 'Laki-laki' },
                                    { label: 'Perempuan', value: 'Perempuan' },
                                ]}
                            />

                            <MyInput
                                borderColor={TIPE == 'Gain' ? colors.primary : colors.lossColor}
                                placeholder="Isi Email"
                                backgroundColor='#F7F7F7'
                                label="Email"
                                value={kirim.email}
                                onChangeText={(x) => setKirim({ ...kirim, 'email': x })}
                            />

                            <MyInput
                                borderColor={TIPE == 'Gain' ? colors.primary : colors.lossColor}
                                placeholder="Isi Nomor Telepon (Contoh 081xxx) "
                                backgroundColor='#F7F7F7'
                                keyboardType="phone-pad"
                                label="Nomor Telepon (Contoh 081xxx)"
                                value={kirim.telepon}
                                onChangeText={(x) => setKirim({ ...kirim, 'telepon': x })}
                            />



                            <MyCalendar
                                borderColor={TIPE == 'Gain' ? colors.primary : colors.lossColor}
                                onDateChange={x => setKirim({
                                    ...kirim,
                                    tanggal_lahir: x
                                })}
                                value={kirim.tanggal_lahir}
                                label="Pilih Tanggal Lahir"
                                backgroundColor='#F7F7F7'
                                data={[
                                    { label: 'Laki-laki', value: 'laki-laki' },
                                    { label: 'Perempuan', value: 'perempuan' },
                                ]}
                            />


                            <MyInput
                                borderColor={TIPE == 'Gain' ? colors.primary : colors.lossColor}
                                keyboardType="number-pad"
                                placeholder="Isi Tinggi Badan (cm)"
                                backgroundColor='#F7F7F7'
                                label="Tinggi Badan (cm)"
                                value={kirim.tinggi_badan}
                                onChangeText={(x) => setKirim({ ...kirim, 'tinggi_badan': x })}
                            />

                            <MyInput
                                borderColor={TIPE == 'Gain' ? colors.primary : colors.lossColor}
                                placeholder="Isi Berat Badan (kg)"
                                keyboardType="number-pad"
                                backgroundColor='#F7F7F7'
                                label="Berat Badan (kg)"
                                value={kirim.berat_badan}
                                onChangeText={(x) => setKirim({ ...kirim, 'berat_badan': x })}
                            />

                            <MyInput
                                borderColor={TIPE == 'Gain' ? colors.primary : colors.lossColor}
                                placeholder="Isi Kode Akses"
                                backgroundColor='#F7F7F7'
                                label="Kode Akses"
                                secureTextEntry={true}
                                value={kirim.password}
                                onChangeText={(x) => setKirim({ ...kirim, 'password': x })}
                            />

                            <View style={{
                                marginTop: 20
                            }}>
                                <TouchableWithoutFeedback onPress={handleKirim}>
                                    <View style={{
                                        padding: 10,
                                        backgroundColor: TIPE == 'Gain' ? colors.primary : colors.lossColor,
                                        alignItems: 'center',
                                        borderRadius: 30,
                                    }}>
                                        <Text style={{
                                            fontFamily: fonts.primary[600],
                                            textAlign: 'center',
                                            color: colors.white
                                        }}>
                                            Lanjutkan Program
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <MyGap jarak={20} />
                                <TouchableWithoutFeedback onPress={() => navigation.navigate('Login', {
                                    tipe: TIPE,
                                })}>
                                    <View style={{
                                        padding: 10,
                                        backgroundColor: colors.black,
                                        alignItems: 'center',
                                        borderRadius: 30,
                                    }}>
                                        <Text style={{
                                            fontFamily: fonts.primary[600],
                                            textAlign: 'center',
                                            color: colors.white
                                        }}>
                                            Masuk
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                        </View>

                    </View>

                </ScrollView>
            </ImageBackground>


        </View>
    )
}