import { useField } from "formik";
import {
  Flex,
  FormControl,
  Input,
  Text,
  WarningOutlineIcon,
} from "native-base";
import React from "react";

export function Inputs({
  title,
  name,
  form = false,
  type = "text",
  keyboardType = "default",
  required = false
}: {
  name: string;
  title: string;
  form?: boolean;
  type?: "text" | "password";
  keyboardType?: "numeric" | "default";
  required?: boolean;
}) {
  const [field, meta, helper] = useField(name);
  if (form)
    return (
      <FormControl isInvalid={meta.touched && meta.error ? true : false} isRequired={required} >
        <Flex flexDirection={"row"} mt={4} alignItems="center">
          <FormControl.Label flex={3}>{title}</FormControl.Label>
          <Text flex={0.2}>:</Text>
          <Input
            flex={4}
            variant={"underlined"}
            {...field}
            onChangeText={(t) => helper.setValue(t)}
            isInvalid={meta.touched && meta.error ? true : false}
            
          />
        </Flex>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {meta.error}
        </FormControl.ErrorMessage>
      </FormControl>
    );
  else
    return (
      <FormControl isInvalid={meta.touched && meta.error ? true : false}  isRequired={required}>
        <FormControl.Label colorScheme={"black"} >{title} {form ? `:` : null}</FormControl.Label>
        <Input
          type={type}
          onBlur={() => {
            helper.setTouched(true)
          }}
          value={field.value}
          onChangeText={(t) => helper.setValue(t)}
          isInvalid={meta.touched && meta.error ? true : false}
          keyboardType={keyboardType}
          size={"xl"}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {meta.error}
        </FormControl.ErrorMessage>
      </FormControl>
    );
}
