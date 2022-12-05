import React from "react";
import { Box, Text, View } from "native-base";

export function Footer() {
  return (
    <View>
      <Text color="white" fontSize={"2xs"}>Developed under</Text>
      <Box pl="3">
        <Text color="white">ICAR - National Fellow project</Text>
        <Text color="white" fontFamily={"heading"} >
          ICAR - National Institute of Animal Nutrition and Physiology
        </Text>
        <Text color="white">Adugodi, Bangalore - 560 030</Text>
      </Box>
    </View>
  );
}
