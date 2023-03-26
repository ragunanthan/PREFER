import { useField } from "formik";
import {
  CheckIcon,
  FormControl,
  Select,
  WarningOutlineIcon,
  Flex,
  Text,
  ChevronDownIcon,
  ChevronUpIcon,
} from "native-base";
import React from "react";
type SelectPropType =  {
  options: { value: string; label: string }[];
  title: string;
  placeholder: string;
  onChage ?:(e:string) => void;
  value ?: string;
  error ?: string;
  touched ?: boolean;
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
      {title && <FormControl.Label>{title}</FormControl.Label>}

      <Select
        variant={"outline"}
        dropdownIcon={<ChevronDownIcon style={{ marginRight : 7}}  />}
        dropdownOpenIcon={<ChevronUpIcon style={{ marginRight : 7}}  />}
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
          <Select.Item key={value} label={label} value={value} />
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