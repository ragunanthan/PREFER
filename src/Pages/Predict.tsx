import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";
import { Formik } from "formik";
import * as yup from "yup";
import { ENDPOINTS, PostMethod } from "../API/Fetcher";
import { logger } from "../utils/logger";
import { Inputs } from "../Components/Form/InputForm";
import { RadioGroupFormik } from "../Components/Form/RadioGroup";
import { useAppContext } from "../provider/AppContext";
import { style } from "../Components/Container";
import { ToastAlert } from "../Components/Toast";
import { DrawerActions } from "@react-navigation/native";
import { LoginPlease } from "./Dashboard";

export function Predict(props: any) {
  const [calculatedValue, setCalculatedValue] = useState<number | null>(null);
  const toast = useToast();
  const { userState, setUserState, showLogin, setShowLogin } = useAppContext();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {

      if (userState === null) {
         props.navigation.navigate("Login");
      }
    });
    return unsubscribe;
  }, [userState]);

  function savePredict(values: any) {
    let cal = values.h0 - values.h1 + (values.h0 - values.h4);
    setCalculatedValue(cal);
    PostMethod(ENDPOINTS.PREFER, {
      bullID: values.bullID,
      ejakulationNo: values.ejakulationNo,
      h0: parseInt(values.h0),
      h1: parseInt(values.h1),
      h4: parseInt(values.h4),
      calculation: cal,
      authorId: userState?.userId,
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
      })
      .catch((e) => {
        logger.error(e);
      });
  }
  if (userState?.userId)
    return (
      <ScrollView>
        <Box alignItems={"center"} pb={2}>
          <Formik
            initialValues={{
              bullID: "",
              ejakulationNo: "1",
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
                <Inputs title="Enter bull Id" name={"bullID"} type={"text"} />
                <RadioGroupFormik
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
        </Box>
      </ScrollView>
    );
  else return null;
}
