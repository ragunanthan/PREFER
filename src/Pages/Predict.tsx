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
  WarningOutlineIcon,
} from "native-base";
import { Formik, useField } from "formik";
import * as yup from "yup";
import { ENDPOINTS, fetcher, PostMethod } from "../API/Fetcher";
import { logger } from "../utils/logger";
import { Inputs } from "../Components/Form/InputForm";

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
        onSubmit={(values: any) => {
          setCalculatedValue((values.h0 - values.h1) + (values.h0 - values.h4));
          PostMethod(ENDPOINTS.PREFER, {
            bullID: values.bullID,
          ejakulationNo:  values.ejakulationNo,
          h0: parseInt(values.h0),
          h1: parseInt(values.h1),
          h4: parseInt(values.h4),
            calculation : (values.h0 - values.h1) + (values.h0 - values.h4)
          })
            .then((r) => {
              logger.info(r.data);
            })
            .catch((e) => {
              logger.error(e);
            });
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
            <Inputs title="Enter bull Id" name={"bullID"}  type={"text"} />
            <RadioGroup title={"Ejaculation no"} name={"ejakulationNo"} />
            <Inputs title="Progressive motility 0h" name={"h0"}  type={"text"} />
            <Inputs title="Progressive motility 1h" name={"h1"}  type={"text"} />
            <Inputs title="Progressive motility 4h" name={"h4"}  type={"text"} />
            <Button
              onPress={handleSubmit}
              w={"32"}
              mt="6"
              bg="black"
              borderRadius={"20"}
            >
              Process
            </Button>
            <Text mt={3} fontSize={"lg"} fontWeight={"bold"}>
              {calculatedValue ? calculatedValue : ""}
            </Text>
          </Flex>
        )}
      </Formik>
      <ShowData />
    </ScrollView>
  );
}

function ShowData() {
  const [state, setState] = useState([]);
  useEffect(() => {
    fetcher.get(ENDPOINTS.PREFER)
      .then((r) => {
        logger.info(r.data);
        
        setState(r.data);
      })
      .catch((e) => {
        logger.error(e);
      });
  }, []);
  return (
    <Flex>
      {state.map((i: any, index) => (
        <HStack key={index}>
          <Text>{index + 1} .</Text>
          <Box pl={3}>
            <List title={"Created at"} value={i.createdAt.slice(0, 10)} />
            <List title={"Bull ID"} value={i.bullID} />
            <List title={"h0"} value={i.h0} />
            <List title={"h1"} value={i.h1} />
            <List title={"h4"} value={i.h4} />
            <List title={"calculation"} value={i.calculation} />
            <List title={"isAccept"} value={i.isAccept} />
          </Box>
        </HStack>
      ))}
    </Flex>
  );
}

function List({ title, value }: any) {
  return (
    <HStack space={"3"}>
      <Text>{title} : </Text>
      <Text>{value} </Text>
    </HStack>
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
