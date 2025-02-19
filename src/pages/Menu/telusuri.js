import { View, Text, TouchableNativeFeedback, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MyHeader } from '../../components';
import { Color, colors, fonts, windowWidth } from '../../utils';
import axios from 'axios';
import { apiURL, getData, webURL } from '../../utils/localStorage';
import { FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export default function Telusuri({ navigation }) {
  const [data, setData] = useState([]);
  const isFocus = useIsFocused();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (isFocus) {
      getData('user').then(u => {
        setUser(u);
        axios.post(apiURL + 'artikel', {
          tipe: u.tipe
        }).then(res => {
          console.log(res.data.filter(i => i.kategori == 'Banner'));
          setData(res.data);
        });
      });
    }
  }, [isFocus]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      {/* Header */}
      <View>
        <MyHeader title="Telusuri" />
      </View>

      {/* ScrollView untuk konten */}
      <ScrollView>
        <View style={{ padding: 10 }}>
          {/* SCROLL GALLERY (Gambar) */}
          <View style={{ marginTop: 20 }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={data.filter(i => i.kategori == 'Banner')}
              renderItem={({ item, index }) => (
                <TouchableWithoutFeedback onPress={() => navigation.navigate('FaktaMitos', item)}>
                  <View style={{ marginRight: 10, borderRadius: 8, overflow: 'hidden' }}>
                    <Image
                      source={{ uri: webURL + item.file_artikel }}
                      style={{ width: windowWidth - 20, resizeMode: 'contain', height: 250, borderRadius: 8 }}
                    />
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </View>

          {/* MITOS ATAU FAKTA */}
          <View style={{ marginTop: 20, padding: 10 }}>
            <Text style={{ fontFamily: fonts.primary[600], fontSize: 15, color: user.tipe == 'Gain' ? colors.primary : colors.secondary }}>
              Mitos Atau Fakta?
            </Text>
            {data.filter(i => i.kategori == 'Mitos atau Fakta').length > 0 ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={data.filter(i => i.kategori == 'Mitos atau Fakta')}
                renderItem={({ item, index }) => (
                  <TouchableWithoutFeedback onPress={() => navigation.navigate('FaktaMitos', item)}>
                    <View style={{ marginRight: 10, borderRadius: 8, overflow: 'hidden' }}>
                      <Image
                        source={{ uri: webURL + item.file_artikel }}
                        style={{ width: 160, height: 200, borderRadius: 8 }}
                      />
                      <Text style={{ width: 160, height: 70, maxWidth: 160, position: 'absolute', bottom: 0, color: colors.white, padding: 4, backgroundColor: '#00000080' }}>
                        {item.judul}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                )}
              />
            ) : (
              <Text style={{ textAlign: 'center', marginTop: 10, color: colors.gray }}>Belum ada konten</Text>
            )}
          </View>

          {/* MAKANAN SEHAT */}
          <View style={{ marginTop: 20, padding: 10 }}>
            <Text style={{ fontFamily: fonts.primary[600], fontSize: 15, color: user.tipe == 'Gain' ? colors.primary : colors.secondary }}>
              Rekomendasi{'\n'}Makanan Sehat
            </Text>
            {data.filter(i => i.kategori == 'Rekomendasi Makanan Sehat').length > 0 ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={data.filter(i => i.kategori == 'Rekomendasi Makanan Sehat')}
                renderItem={({ item, index }) => (
                  <TouchableWithoutFeedback onPress={() => navigation.navigate('FaktaMitos', item)}>
                    <View style={{ marginRight: 10, borderRadius: 8, overflow: 'hidden' }}>
                      <Image
                        source={{ uri: webURL + item.file_artikel }}
                        style={{ width: 160, height: 200, borderRadius: 8 }}
                      />
                      <Text style={{ width: 160, height: 70, maxWidth: 160, position: 'absolute', bottom: 0, color: colors.white, padding: 4, backgroundColor: '#00000080' }}>
                        {item.judul}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                )}
              />
            ) : (
              <Text style={{ textAlign: 'center', marginTop: 10, color: colors.gray }}>Belum ada konten</Text>
            )}
          </View>

          {/* ASUPAN KALORI TAMBAHAN */}
          <View style={{ marginTop: 20, padding: 10 }}>
            <Text style={{ fontFamily: fonts.primary[600], fontSize: 15, color: user.tipe == 'Gain' ? colors.primary : colors.secondary }}>
              Asupan Kalori{'\n'}Tambahan
            </Text>
            {data.filter(i => i.kategori == 'Asupan Kalori Tambahan').length > 0 ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={data.filter(i => i.kategori == 'Asupan Kalori Tambahan')}
                renderItem={({ item, index }) => (
                  <TouchableWithoutFeedback onPress={() => navigation.navigate('FaktaMitos', item)}>
                    <View style={{ marginRight: 10, borderRadius: 8, overflow: 'hidden' }}>
                      <Image
                        source={{ uri: webURL + item.file_artikel }}
                        style={{ width: 160, height: 200, borderRadius: 8 }}
                      />
                      <Text style={{ width: 160, height: 70, maxWidth: 160, position: 'absolute', bottom: 0, color: colors.white, padding: 4, backgroundColor: '#00000080' }}>
                        {item.judul}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                )}
              />
            ) : (
              <Text style={{ textAlign: 'center', marginTop: 10, color: colors.gray }}>Belum ada konten</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}