import React, { useMemo, useState } from "react";
import { Box, Flex, Input, Text } from "native-base";

export default function InputCalculator() {
  const [state, setState] = useState("");

  const concentration = useMemo(() => state, [state]);

  return (
    <Flex p={3}>
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
  );
}
