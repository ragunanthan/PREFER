import dayjs from 'dayjs';
import { useField } from 'formik';
import React, { useState, useCallback } from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MonthPickers from 'react-native-month-year-picker';

const MonthPicker = ({ name } : { name : string }) => {
  const [field, meta, helper] = useField(name);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showPicker = useCallback((value: any) => setShow(value), []);

  const onValueChange = useCallback(
    (event: any, newDate: any) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setDate(selectedDate);
    },
    [date, showPicker],
  );

  return (
    <SafeAreaView>
      <Text>Month Year Picker Example</Text>
      <Text>{dayjs(date).format( "MM-YYYY")}</Text>
      <TouchableOpacity onPress={() => showPicker(true)}>
        <Text>OPEN</Text>
      </TouchableOpacity>
      {show && (
        <MonthPickers
          onChange={onValueChange}
          value={date}
          minimumDate={new Date()}
          maximumDate={new Date(2025, 5)}
          locale="en"
        />
      )}
    </SafeAreaView>
  );
};



export default MonthPicker;