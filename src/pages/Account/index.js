import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
    FlatList,
    TouchableWithoutFeedback,
} from 'react-native';
import { windowWidth, fonts, MyDimensi } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { Color, colors } from '../../utils/colors';
import { MyButton, MyGap, MyHeader } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { ScrollView } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";


export default function ({ navigation, route }) {
    const [user, setUser] = useState({});
    const [com, setCom] = useState({});
    const isFocused = useIsFocused();
    const [wa, setWA] = useState('');
    const [open, setOpen] = useState(false);
    const [grafik, setGrafik] = useState({
        label: [0],
        value: [0]
    });

    const [mulai, setMulai] = useState('');
    const [plan, setPlan] = useState([]);

    const __getMulai = () => {
        getData('mulai').then(ml => {
            if (ml) {
                setMulai(ml);
                let ARR = [];
                for (let index = 1; index <= 14; index++) {
                    ARR.push({
                        minggu: index <= 7 ? 'Pertama' : 'Kedua',
                        hari: index,
                        tanggal: moment(ml).add(index - 1, 'day').format('YYYY-MM-DD'),
                    })
                }
                setPlan(ARR);
            }

        })
    }
    const __getIMT = () => {
        getData('user').then(u => {
            axios.post(apiURL + 'imt_saya', {
                fid_pengguna: u.id_pengguna,
            }).then(res => {
                let lb = [];
                let vl = [];
                console.log(res.data);
                res.data.map((i, index) => {
                    lb.push(index + 1);
                    vl.push(parseFloat(i.imt));
                });

                setGrafik({
                    label: lb,
                    value: vl
                })
            })
        })
    }

    const [sudahnonton, setSudahNonton] = useState(0);

    const __getUser = () => {
        getData('user').then(u => {

            axios.post(apiURL + 'get_nonton', {
                fid_pengguna: u.id_pengguna
            }).then(res => {
                setSudahNonton(res.data);
            })

            axios.post(apiURL + 'get_profile', {
                id: u.id_pengguna
            }).then(res => {

                setOpen(true);
                setUser(res.data);
                storeData('user', res.data);
            })
        });
    }

    const MyIMT = () => {

        let DATA = [];
        for (let index = 0; index <= 35; index++) {
            console.log(index);
            DATA.push(index);
        }


        return <View style={{
            // height: 15,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <FlatList horizontal data={DATA} renderItem={({ item, index }) => {
                return <View style={{
                    // backgroundColor: 'red',
                    width: (windowWidth / 40) - 0.5,
                }}>

                    <View style={{
                        height: 10,
                    }}>
                        {item == parseFloat(user.imt).toFixed(0) ? <Icon color={user.tipe == 'Gain' ? colors.primary : colors.secondary} type='ionicon' name='caret-down' size={10} /> : <Text></Text>}
                    </View>
                    <View style={{
                        height: 15,
                        backgroundColor: item >= 0 && item <= 10 ? '#B478B3' : item > 10 && item <= 20 ? '#427CC0' : item > 20 && item <= 30 ? '#F26523' : '#707A33',
                    }}></View>
                    <Text style={{
                        fontFamily: fonts.primary[600],
                        marginTop: 2,
                        width: '100%',
                        flex: 1,
                        fontSize: 7,
                    }}>{item == 11 ? `10` : item == 21 ? `20` : item == 31 ? `30` : item == 35 ? `35` : ''}</Text>
                </View>
            }} />
        </View>


    }




    useEffect(() => {


        if (isFocused) {
            __getUser();
            __getMulai();
            __getIMT();
        }




    }, [isFocused]);



    const btnKeluar = () => {
        Alert.alert(MYAPP, 'Apakah kamu yakin akan keluar ? Jika kamu keluar maka tahapan latihanmu akan dimulai dari awal lagi ', [
            {
                text: 'Batal',
                style: "cancel"
            },
            {
                text: 'Keluar',
                onPress: () => {
                    storeData('user', null);
                    storeData('mulai', null);
                    storeData('alarm', null);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Splash' }],
                    });
                }
            }
        ])
    };

    const MyList = ({ label, value, back, onPress }) => {
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View
                    style={{
                        marginVertical: Math.round(windowWidth / 22) / 3,
                        width: Math.round(windowWidth / 2.2),
                        height: 65,
                        // padding: 5,
                        paddingHorizontal: 10,
                        backgroundColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                        borderRadius: 5,
                    }}>
                    <Text
                        style={{
                            ...fonts.headline5,
                            color: colors.white,
                            textAlign: 'center',
                        }}>
                        {label}
                    </Text>
                    <View style={{
                        flex: 1,
                        paddingBottom: 5,
                        // backgroundColor: 'red',
                        flexDirection: 'row',
                        // alignItems: 'flex-end',
                        justifyContent: 'center',

                    }}>
                        <Text
                            style={{
                                ...fonts.headline5,
                                fontSize: 18,
                                color: colors.white,
                                textAlign: 'center',
                            }}>
                            {value}
                        </Text>
                        <Text
                            style={{
                                left: 5,
                                ...fonts.headline5,
                                color: colors.white,
                                textAlign: 'center',
                            }}>
                            {back}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>


            <MyHeader title="Akun Saya" onPress={() => navigation.goBack()} />
            {!open && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}
            <ScrollView showsVerticalScrollIndicator={false}>
                {open &&

                    <View style={{
                        margin: 5,
                        flex: 1,
                    }}>
                        <View style={{
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flexDirection: "row",
                            padding: 10

                        }}>
                            <View style={{
                                width: 60,
                                height: 60,
                                borderWidth: 1,
                                borderColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                                overflow: 'hidden',
                                borderRadius: 100,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>

                                <Image source={{
                                    uri: user.file_pengguna
                                }} style={{
                                    width: 55,
                                    height: 55,
                                    borderRadius: 100

                                }} />

                            </View>

                            <View style={{
                                marginLeft: 20
                            }}>
                                <Text style={{
                                    fontFamily: fonts.primary[600],
                                    fontSize: 15,
                                    color: user.tipe == 'Gain' ? colors.primary : colors.secondary,

                                }}>Halo Kak {user.nama}</Text>

                                <Text style={{
                                    fontFamily: fonts.primary[400],
                                    fontSize: 13,
                                    color: Color.blueGray[400],

                                }}>Weight {user.tipe} Program</Text>
                            </View>
                        </View>

                        {/* data detail */}
                    </View>

                }

                <View style={{
                    padding: 10,
                }}>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: "space-between",
                        flexWrap: 'wrap',
                        alignItems: "center"
                    }}>

                        <MyList onPress={() => navigation.navigate('VideoData', user)} label="Progres Saya" value={sudahnonton} back='video' />
                        <MyList label="Usia" value={moment().diff(user.tanggal_lahir, 'year')} back='th' />
                        <MyList label="Berat Badan" value={user.berat} back='kg' />
                        <MyList label="Tinggi Badan" value={user.tinggi} back='cm' />
                        <MyList label="Jenis Kelamin" value={user.jenis_kelamin} />
                        <MyList label="Target Kamu" value={user.berat_target} back='kg' />


                    </View>

                    {/* Indesk masa tubuh */}

                    <View style={{
                        padding: 10,
                        borderWidth: 1,
                        borderColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                        borderRadius: 10,
                        marginTop: 20
                    }}>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                flex: 1,
                                fontFamily: fonts.primary[600],
                                fontSize: 15,
                                color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                            }}>Indeks Masa Tubuh</Text>
                            <Text style={{
                                fontFamily: fonts.primary[700],
                                fontSize: 25,
                                color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                            }}>{user.imt}</Text>


                        </View>
                        <MyIMT />
                    </View>


                    {/* Perjalanan kamu */}
                    <View style={{
                        padding: 10,
                        borderWidth: 1,
                        borderColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                        borderRadius: 10,
                        marginTop: 20
                    }}>

                        <Text style={{
                            fontFamily: fonts.primary[600],
                            fontSize: 15,
                            color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                        }}>Perjalanan Kamu</Text>
                        {mulai.length > 0 && <Text style={{ fontSize: 11, fontFamily: fonts.primary[400] }}>{moment(mulai).format('DD MMM YYYY') + ' - ' + moment(mulai).add(13, 'day').format('DD MMM YYYY')}</Text>}
                        <LineChart
                            data={{
                                labels: grafik.label,
                                datasets: [
                                    {
                                        data: grafik.value
                                    }
                                ]
                            }}
                            width={windowWidth / 1.15} // from react-native
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix=""
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{

                                backgroundColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                                backgroundGradientFrom: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                                backgroundGradientTo: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                    fontSize: 9,
                                },
                                propsForDots: {
                                    r: "5",
                                    strokeWidth: "2",
                                    stroke: "#ffa726",
                                    strokeDasharray: [0, 2]
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        />

                    </View>

                    {/*  HASIL RENCANA KAMU */}
                    <View style={{
                        padding: 10,
                        borderWidth: 1,
                        borderColor: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                        borderRadius: 10,
                        marginTop: 20
                    }}>

                        <Text style={{
                            fontFamily: fonts.primary[600],
                            fontSize: 15,
                            color: user.tipe == 'Gain' ? colors.primary : colors.secondary,
                        }}>Hasil Rencana Kamu</Text>
                        {mulai.length > 0 && <Text style={{ fontSize: 11, fontFamily: fonts.primary[400] }}>{moment(mulai).format('DD MMM YYYY') + ' - ' + moment(mulai).add(13, 'day').format('DD MMM YYYY')}</Text>}
                        <FlatList horizontal persistentScrollbar={true} showsHorizontalScrollIndicator={true} data={plan} renderItem={({ item, index }) => {

                            let MYBACK = user.tipe == 'Gain' ? colors.primary : colors.secondary;
                            return (
                                <View style={{
                                    marginRight: 4,

                                }}>
                                    <View style={{
                                        borderRadius: 30,
                                        width: 60,
                                        height: 60,
                                        borderWidth: 1,
                                        borderColor: Color.blueGray[400],
                                        backgroundColor: moment(item.tanggal).format('YYYY-MM-DD') <= moment().format('YYYY-MM-DD') ? MYBACK : colors.border,

                                    }}>

                                    </View>
                                    <Text style={{
                                        marginTop: 10,
                                        fontFamily: fonts.primary[400],
                                        fontSize: 10,
                                        textAlign: 'center',
                                    }}>{moment(item.tanggal).format('DD/MM')}</Text>


                                </View>
                            )
                        }} />

                    </View>


                </View>
                <View style={{
                    padding: 20,
                }}>
                    <MyButton iconColor={colors.white} warna={user.tipe == 'Gain' ? colors.primary : colors.secondary} title="Edit Profile" Icons="create-outline" onPress={() => navigation.navigate('AccountEdit', user)} />
                    <MyGap jarak={10} />
                    <MyButton onPress={btnKeluar} warna={Color.blueGray[300]} title="Log Out" Icons="log-out-outline" iconColor={colors.white} colorText={colors.white} />
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
