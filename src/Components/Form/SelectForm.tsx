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

export default function SelectForm({
  options,
  title,
  name,
  placeholder
}: {
  options: { value: string; label: string }[];
  title: string;
  name: string;
  placeholder: string;
}) {
  const [field, meta, helper] = useField(name ?? "");

  return (
    <FormControl isInvalid={meta.touched && meta.error ? true : false}>
      <Flex flexDirection={"row"} mt={4} alignItems="center">
        <FormControl.Label flex={3}>{title}</FormControl.Label>
        <Text flex={0.2}>:</Text>
        <Select
          flex={4}
          variant={"underlined"}
          dropdownIcon={<ChevronDownIcon size={"sm"} />}
          accessibilityLabel={placeholder}
          placeholder={placeholder}
          _selectedItem={{
            bg: "grey",
          }}
          fontSize={"md"}
          selectedValue={field.value}
          onValueChange={(val) => helper.setValue(val)}
        >
          {options.map(({ value = "0", label = "-" }) => (
            <Select.Item label={label} value={value} />
          ))}
        </Select>
      </Flex>

      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {meta.error}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
