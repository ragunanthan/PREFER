import React, { useMemo, useState } from "react";
import { Box, Flex, Input, Text } from "native-base";
import { TabBar } from "./Home";
import { images } from "../Assests";

const navgationArr = [
  {
    icon: images.calculator,
    title: "Calculator",
    navigation: "InputCalculator",
  },
  {
    icon: images.form,
    title: "Predict",
    navigation: "Predict",
  },
  {
    icon: images.list,
    title: "View",
    navigation: "Dashboard",
  },
];

export default function InputCalculator(props: any) {
  const [state, setState] = useState("");

  const concentration = useMemo(() => state, [state]);

  return (
    <Flex
      style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}
      position="relative"
    >
      <Flex >
        <Text fontWeight={"normal"} fontSize={"md"}>
          Enter the concentration (in millions/mL) :
        </Text>
        <Input
          keyboardType="numeric"
          marginTop={2}
          onChangeText={(t) => setState(t)}
        />

        <Box mt={4}>
          {" "}
          <Text fontWeight={"normal"} fontSize={"md"}>
            Result :{" "}
            <Text fontWeight={"bold"} fontSize={"lg"}>
              {concentration !== "" ? `${concentration} millions/mL` : ""}
            </Text>
          </Text>
        </Box>
      </Flex>
      <TabBar navigation={props.navigation} navgationArr={navgationArr} />
    </Flex>
  );
}
