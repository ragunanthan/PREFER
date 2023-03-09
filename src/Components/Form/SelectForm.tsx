import { useField } from "formik";
import {
  CheckIcon,
  FormControl,
  Select,
  WarningOutlineIcon,
  Flex,
  Text,
  ChevronDownIcon,
} from "native-base";
import React from "react";
type SelectPropType =  {
  options: { value: string; label: string }[];
  title: string;
  placeholder: string;
  onChage :(e:string) => void;
  value : string;
  error : string;
  touched: boolean;
}

export default function SelectForm({
  options,
  title,
  value,
  onChage,
  touched,
  placeholder,
  error
}:SelectPropType) {
 

  return (
    <FormControl isInvalid={touched && error ? true : false}>
      <FormControl.Label>{title}</FormControl.Label>

      <Select
        variant={"underlined"}
        dropdownIcon={<ChevronDownIcon size={"sm"} />}
        accessibilityLabel={placeholder}
        placeholder={placeholder}
        _selectedItem={{
          bg: "grey",
        }}
        fontSize={"md"}
        selectedValue={value}
        onValueChange={onChage}
      >
        {options.map(({ value = "0", label = "-" }) => (
          <Select.Item label={label} value={value} />
        ))}
      </Select>

      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {error}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}


export const SelectFormFormik = ({name, ...rest} : SelectPropType & { name: string}) => {
  const [field, meta, helper] = useField(name ?? "");
  return <SelectForm {...rest} touched={meta.touched} error={meta.error ?? ""} value={field.value} onChage={(val) => helper.setValue(val)} />
}