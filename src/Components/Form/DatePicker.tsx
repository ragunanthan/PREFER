// @flow Copyright ©2021 ICS. All Rights Reserved.
import { FormControl, WarningOutlineIcon } from "native-base";
import React, { useCallback, useState } from "react";
import { Image, Text, View } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ScaledSheet, moderateScale } from "react-native-size-matters";
import dayjs from "dayjs";
import { TouchableOpacity } from "react-native";
import { images } from "../../Assests";
import { useField } from "formik";
import MonthPickers from "react-native-month-year-picker";

export const applyDateFormate = (date: Date, format: string) => {
  return dayjs(date).format(format);
};
export const RESIZE_FACTOR_0_1 = 0.1;
export const RESIZE_FACTOR_0_2 = 0.2;
interface DatePickerPropsType {
  style?: object;
  label?: string;
  value?: Date | undefined;
  placeholder?: string;
  onDateChange?: (date: Date) => void;
  disabled?: boolean | undefined;
  minDate?: Date | undefined;
  maxDate?: Date | undefined;
  dateFormat?: string;
  error?: string;
  type?: "date" | "datetime" | "time" | "month";
  required?: boolean | undefined;
  testID?: string | undefined;
  dateLabelStyle?: object;
  onBlur?: () => void;
  errorLabelStyle?: object;
  name: string;
}

export const DatePicker = (props: DatePickerPropsType) => {
  const [field, meta, helper] = useField(props.name);
  const {
    label = "",
    placeholder = "",
    type = "date",
    style,
    testID,
    error,
    dateLabelStyle,
    onBlur = () => {},
  } = props;

  const [visiblePicker, setVisiblePicker] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleConfirm = (date: Date) => {
    helper.setValue(date);
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setVisiblePicker(false);
  };

  const onValueChange = useCallback(
    (event: any, newDate: any) => {
      const selectedDate = newDate || field.value;
      helper.setValue(selectedDate);
      hideDatePicker();
    },
    [field.value]
  );

  return (
    <FormControl isInvalid={meta.touched && meta.error ? true : false}>
      <View style={[styles.container, style]}>
        <View style={styles.inputContainer}>
          <FormControl.Label colorScheme={"black"}>{label}</FormControl.Label>

          <TouchableOpacity
            testID={testID}
            style={[styles.dateContainer, Boolean(error) && styles.error]}
            onPress={() => {
              setVisiblePicker(true);
              setFocused(true);
            }}
          >
            <Text style={[dateLabelStyle]}>
              {field.value
                ? applyDateFormate(field.value, type === "month" ? "MMMM YYYY" : "DD MMM YYYY")
                : placeholder}
            </Text>

            <Image style={styles.calendarIcon} source={images.icons.calendar} />
          </TouchableOpacity>

          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {meta.error}
          </FormControl.ErrorMessage>
        </View>
        {type === "month" ? (
          visiblePicker ? (
            <MonthPickers
              onChange={onValueChange}
              value={field.value ?? new Date()}
              maximumDate={new Date()}
              locale="en"
            />
          ) : null
        ) : (
          <DateTimePickerModal
            isVisible={visiblePicker}
            mode={type}
            maximumDate={new Date()}
            onHide={() => {
              setFocused(false);
              onBlur();
            }}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        )}
      </View>
    </FormControl>
  );
};

export const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {},
  dateContainer: {
    borderColor: "black",
    borderWidth: 1,
    marginTop: "5@ms",
    height: moderateScale(38, RESIZE_FACTOR_0_1),
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "10@ms",
    justifyContent: "space-between",
  },
  calendarIcon: {
    height: moderateScale(16, RESIZE_FACTOR_0_2),
    width: moderateScale(16, RESIZE_FACTOR_0_2),
  },
  error: {
    borderColor: "red",
  },
});
