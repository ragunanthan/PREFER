import React from "react";
import { Box, Text, View } from "native-base";

export function Footer() {
  return (
    <View mb={5}>
      <Text color="black" fontSize={"2xs"}>Developed under</Text>
      <Box pl="3">
        <Text color="black">ICAR - National Fellow project</Text>
        <Text color="black" fontFamily={"Poppins-Regular"} >
          ICAR - National Institute of Animal Nutrition and Physiology
        </Text>
        <Text color="black">Adugodi, Bangalore - 560 030</Text>
      </Box>
    </View>
  );
}
