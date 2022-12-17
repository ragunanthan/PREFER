import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  StatusBar,
  Text,
} from "native-base";
import React from "react";
import { images } from "../Assests";
export function Header({ navigation }: any) {
  return (
    <>
      <Box safeAreaTop />
      <Box
        height={180}
        borderBottomRadius="25"
        shadow="9"
        width={"100%"}
        bg="white"
      >
        <HStack justifyContent="space-between" alignItems="center" p="3">
          <Image source={images.icar} alt="Sample 2" />
          <Text color="black" fontSize="xl" fontWeight="600">
            PREFER
          </Text>
          <Image source={images.niamp} alt="Sample 1" />
        </HStack>
        <HStack
          //   borderColor="red"
          //   borderWidth={"1"}
          //   borderStyle="solid"
          padding="4"
          width={"100%"}
          alignItems="center"
        >
          <IconButton p={3}  onPress={() => navigation.toggleDrawer()}>
            <Image source={images.menu} alt="Sample 5" />
          </IconButton>
          <Text ml="4" color="black" fontWeight="600" fontSize="lg">
            Predicting semen quality simplified
          </Text>
        </HStack>
      </Box>
    </>
  );
}

export function CommonHeader(props: any) {
  let { route, navigation } = props;

  return (
    <>
      <Box safeAreaTop color={"red"} />
      <HStack
        height={180}
        width={"100%"}
        bg="white"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex flexDir={"row"} alignItems="center">
          <IconButton size={"lg"} p={3} onPress={() => navigation.toggleDrawer()}>
            <Image source={images.menu} alt="Sample 5" />
          </IconButton>
          <Text fontSize={"xl"} fontWeight={"bold"}>{route?.params?.title ?? "Home"}</Text>
        </Flex>
        <Box
          width={"90px"}
          height="130px"
        >
          <Image source={images.cow} width="100%" height={"100%"} alt="cow" />
        </Box>
      </HStack>
    </>
  );
}
