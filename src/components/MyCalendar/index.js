import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { Icon, ListItem, Button } from 'react-native-elements';
import { Color, colors } from '../../utils/colors';
import { MyDimensi, fonts } from '../../utils/fonts';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import 'moment/locale/id'


export default function MyCalendar({
  label,
  valueShow,
  maxDate,
  iconname,
  onDateChange,
  value,
  keyboardType,
  secureTextEntry,
  borderColor = colors.primary,
  styleInput,
  placeholder,
  label2,
  iconColor = colors.black,
  textColor = colors.black,
  styleLabel,
  colorIcon = colors.primary,
  data = [],
}) {
  return (

    <View
      style={{

      }}>

      <Text
        style={{
          fontFamily: fonts.primary[600],
          color: colors.black,
          marginBottom: 8,
          fontSize: 15,
          marginTop: 10
        }}>
        {label}
      </Text>


      <View style={{
        backgroundColor: '#f7f7f7',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: borderColor
      }}>

        <View style={{
          position: 'absolute',
          left: 12,
          top: 13,
        }}>
          <Icon type='ionicon' name='calendar' color={borderColor} size={24} />
        </View>
        <Text style={{
          position: 'absolute',
          zIndex: 0,
          ...fonts.body3,
          top: 12,
          left: 44,
        }}>{moment(value).format('DD MMMM YYYY')}</Text>
        <DatePicker
          maxDate={maxDate}
          style={{ width: '100%', height: 50, }}
          date={value}
          mode="date"
          placeholder={placeholder}
          showIcon={false}
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              textAlign: 'left',
              alignItems: 'flex-start',
              opacity: 0,
              paddingLeft: 20,
              borderWidth: 0,
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={onDateChange}
        />
        <View style={{
          position: 'absolute',
          right: 12,
          top: 13,
        }}>
          <Icon type='ionicon' name='caret-down-outline' color={colors.primary} size={24} />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({});