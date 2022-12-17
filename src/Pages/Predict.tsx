import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  HStack,
  Input,
  Radio,
  ScrollView,
  Text,
  WarningOutlineIcon,
} from "native-base";
import { Formik, useField } from "formik";
import * as yup from "yup";

export function Predict() {
  const [calculatedValue, setCalculatedValue] = useState<number | null>(null);
  return (
    <ScrollView flex={1}>
      <Formik
        initialValues={{
          bullID: "",
          ejakulationNo: "1",
          h0: null,
          h1: null,
          h4: null,
        }}
        onSubmit={(values:any) => {
          setCalculatedValue((values.h0-values.h1)+(values.h0-values.h4))
        }}
        validationSchema={yup.object().shape({
          bullID: yup.string().required("Required"),
          ejakulationNo: yup.string().required("Required"),
          h0: yup.number().required("Required"),
          h1: yup.number().required("Required"),
          h4: yup.number().required("Required"),
        })}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <Flex p={5} alignItems="center">
            <Inputs title="Enter bull Id" name={"bullID"} />
            <RadioGroup title={"Ejaculation no"} name={"ejakulationNo"} />
            <Inputs title="Progressive motility 0h" name={"h0"} />
            <Inputs title="Progressive motility 1h" name={"h1"} />
            <Inputs title="Progressive motility 4h" name={"h4"} />
            <Button
              onPress={handleSubmit}
              w={"32"}
              mt="6"
              bg="black"
              borderRadius={"20"}
            >
              Process
            </Button>
            <Text mt={3} fontSize={"lg"} fontWeight={"bold"}>{calculatedValue ? calculatedValue : ""}</Text>
          </Flex>
        )}
      </Formik>
    </ScrollView>
  );
}

function Inputs({ title, name }: { name: string; title: string }) {
  const [field, meta, helper] = useField(name);

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
}

function RadioGroup({ title, name }: { title: string; name: string }) {
  return (
    <Flex flexDirection={"row"} mt={4} alignItems="center">
      <Text flex={3}>{title}</Text>
      <Text flex={0.2}>:</Text>
      <Radio.Group flex={4} name="exampleGroup" defaultValue="1">
        <HStack space={4}>
          <Radio value="1" my={1}>
            1 st
          </Radio>
          <Radio value="2" my={1}>
            2 nd
          </Radio>
        </HStack>
      </Radio.Group>
    </Flex>
  );
}
