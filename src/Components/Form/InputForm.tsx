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
  form = true,
  type = "text",
}: {
  name: string;
  title: string;
  form?: boolean;
  type?: "text" | "password";
}) {
  const [field, meta, helper] = useField(name);
  if (form)
    return (
      <FormControl isInvalid={meta.touched && meta.error ? true : false}>
        <Flex flexDirection={"row"} mt={4} alignItems="center">
          <FormControl.Label flex={3}>{title}</FormControl.Label>
          <Text flex={0.2}>:</Text>
          <Input
            flex={4}
            variant={"underlined"}
            onPressIn={() => helper.setTouched(true)}
            value={field.value}
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
      <FormControl isInvalid={meta.touched && meta.error ? true : false}>
        <FormControl.Label >{title}</FormControl.Label>
        <Input
          type={type}
          onPressIn={() => helper.setTouched(true)}
          value={field.value}
          onChangeText={(t) => helper.setValue(t)}
          isInvalid={meta.touched && meta.error ? true : false}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {meta.error}
        </FormControl.ErrorMessage>
      </FormControl>
    );
}
