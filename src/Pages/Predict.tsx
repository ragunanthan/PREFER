import React, { useEffect, useState } from "react";
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
  VStack,
  WarningOutlineIcon,
} from "native-base";
import { Formik, useField } from "formik";
import * as yup from "yup";
import { ENDPOINTS, fetcher, PostMethod } from "../API/Fetcher";
import { logger } from "../utils/logger";
import { Inputs } from "../Components/Form/InputForm";
import { RadioGroup } from "../Components/Form/RadioGroup";

export function Predict() {
  const [calculatedValue, setCalculatedValue] = useState<number | null>(null);

  function savePredict(values: any) {
    setCalculatedValue(values.h0 - values.h1 + (values.h0 - values.h4));
    PostMethod(ENDPOINTS.PREFER, {
      bullID: values.bullID,
      ejakulationNo: values.ejakulationNo,
      h0: parseInt(values.h0),
      h1: parseInt(values.h1),
      h4: parseInt(values.h4),
      calculation: values.h0 - values.h1 + (values.h0 - values.h4),
    })
      .then((r) => {
        logger.info(r.data);
      })
      .catch((e) => {
        logger.error(e);
      });
  }

  return (
    <ScrollView flex={1}>
      <Formik
        initialValues={{
          bullID: "",
          ejakulationNo: "2",
          h0: "",
          h1: "",
          h4: "",
        }}
        onSubmit={savePredict}
        validationSchema={yup.object().shape({
          bullID: yup.string().required("Required"),
          ejakulationNo: yup.string().required("Required"),
          h0: yup.number().required("Required"),
          h1: yup.number().required("Required"),
          h4: yup.number().required("Required"),
        })}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <VStack space={3} px={5} alignItems="center">
            <Inputs title="Enter bull Id" name={"bullID"} type={"text"} />
            <RadioGroup
              title={"Ejaculation no : "}
              name={"ejakulationNo"}
              option={[
                {
                  value: "1",
                  label: "1 st",
                },
                {
                  value: "2",
                  label: "2 st",
                },
              ]}
            />
            <Inputs title="Progressive motility 0h" name={"h0"} type={"text"} />
            <Inputs title="Progressive motility 1h" name={"h1"} type={"text"} />
            <Inputs title="Progressive motility 4h" name={"h4"} type={"text"} />
            <Button
              onPress={handleSubmit}
              w={"32"}
              mt="6"
              bg="black"
              borderRadius={"20"}
              fontSize="2xl"
            >
              Process
            </Button>
            <Text mt={3} fontSize={"lg"} fontWeight={"bold"}>
              {calculatedValue ? calculatedValue : ""}
            </Text>
          </VStack>
        )}
      </Formik>
    </ScrollView>
  );
}
