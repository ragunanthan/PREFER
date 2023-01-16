import {
  AspectRatio,
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Pressable,
  Stack,
  Text,
  View,
  VStack,
} from "native-base";
import React from "react";

let borderColor = "coolGray.200";
export let style = {
  maxW : "90%",
  rounded : "2xl",
  overflow : "hidden",
  borderColor : borderColor,
  borderWidth : "1",
  backgroundColor : "white",
  shadow: 4,
  _web : {
    shadow: 2,
    borderWidth: 0,
  }
}
export function Container({ title, children, ...rest }: any) {
  return (
    <Box alignItems="center" {...rest} >
      <Box
       {...style}
      >
        <Stack p="4" space={3}>
          {title && (
            <Stack
              borderBottomColor={borderColor}
              borderBottomStyle="solid"
              borderBottomWidth={1}
              space={2}
              pb={1}
            >
              <Heading size="sm" ml="-1">
                {title}
              </Heading>
            </Stack>
          )}

          {children}
        </Stack>
      </Box>
    </Box>
  );
}
