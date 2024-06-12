import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";
import { Formik, FormikBag } from "formik";
import * as yup from "yup";
import { ENDPOINTS, PostMethod } from "../API/Fetcher";
import { logger } from "../utils/logger";
import { Inputs } from "../Components/Form/InputForm";
import { RadioGroupFormik } from "../Components/Form/RadioGroup";
import { useAppContext } from "../provider/AppContext";
import { style } from "../Components/Container";
import { ToastAlert } from "../Components/Toast";
import { Platform } from "react-native";
import { TabBar } from "./Home";
import { images } from "../Assests";

export function Predict(props: any) {
  const [calculatedValue, setCalculatedValue] = useState<any>(undefined);
  const toast = useToast();

  function savePredict(values: any, formikBag: any) {
    let cal = values.h0 - values.h1 + (values.h0 - values.h4);
    setCalculatedValue(cal);
    PostMethod(ENDPOINTS.PREFER, {
      bullID: values.bullID,
      ejakulationNo: values.ejakulationNo,
      h0: parseInt(values.h0),
      h1: parseInt(values.h1),
      h4: parseInt(values.h4),
      calculation: cal,
    })
      .then((r) => {
        logger.info(r.data);
        if (!toast.isActive(cal)) {
          toast.show({
            id: cal,
            render: ({ id }) => {
              return (
                <ToastAlert
                  id={id}
                  title={"Successfully Added item"}
                  status={"success"}
                  variant="solid"
                />
              );
            },
            variant: "left-accent",
          });
        }
        setTimeout(() => {
          setCalculatedValue(undefined);
        formikBag.resetForm();
        }, 5000);
      })
      .catch((e) => {
        logger.error(e);
      });
  }
  return (
    <KeyboardAvoidingView h={{
      base: "full",
      lg: "auto"
    }} width={"100%"} behavior={Platform.OS === "ios" ? "padding" : "height"}>
    <ScrollView>
      <Box alignItems={"center"} pb={2}>
        <Formik
          initialValues={{
            bullID: "",
            ejakulationNo: "",
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
            <VStack
              {...style}
              width={"95%"}
              space={3}
              p={3}
              px={5}
              alignItems="center"
            >
              <Inputs title="Enter bull" name={"bullID"} type={"text"} />
              <RadioGroupFormik
                title={"Ejaculation"}
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
              <Inputs
                title="Progressive motility 0h"
                name={"h0"}
                keyboardType={"numeric"}
              />
              <Inputs
                title="Progressive motility 1h"
                name={"h1"}
                keyboardType={"numeric"}
              />
              <Inputs
                title="Progressive motility 4h"
                name={"h4"}
                keyboardType={"numeric"}
              />
              <Button
                onPress={handleSubmit}
                w={"32"}
                bg="black"
                borderRadius={"20"}
                fontSize="2xl"
              >
                Process
              </Button>
              <Text color={calculatedValue ?? 0 > 18? "red.600" : "green.600"} py={3} fontSize={"xl"} >
                {calculatedValue ? `Result : ${(calculatedValue ?? 0) > 18 ? 'false' : 'true'}` : "-"}
              </Text>
            </VStack>
          )}
        </Formik>
      </Box>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
