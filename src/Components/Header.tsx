import {
  Box,
  createIcon,
  Flex,
  HamburgerIcon,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
} from "native-base";
import React from "react";
import Svg, { G, Path } from "react-native-svg";
import { images } from "../Assests";

const Menu = ({ navigation }: { navigation: any }) => (
  <IconButton size={"lg"} p={3} onPress={() => navigation.toggleDrawer()}>
    <HamburgerIcon size={"lg"} />
  </IconButton>
);
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
          <Heading color="black" fontSize="xl" fontWeight="bold">
            ICAR - NIANP
          </Heading>
          <Image source={images.niamp} alt="Sample 1" />
        </HStack>
        <HStack
          //   borderColor="red"
          //   borderWidth={"1"}
          //   borderStyle="solid"
          padding="2"
          width={"100%"}
          alignItems="center"
        >
          <Menu navigation={navigation} />
          <Box ml="2">
            <Heading color="black" fontSize="xl" fontWeight="bold">
              PREFER
            </Heading>
            <Text color="black" fontWeight="600" fontSize="md">
              Predicting Semen Quality 
            </Text>
          </Box>
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
       
        width={"100%"}
        bg="white"
        alignItems="center"
        justifyContent="space-between"
        shadow={3}
        mb={props.route.name === "Dashboard" ? 0 : 6}
      >
        <Flex  flexDir={"row"} alignItems="center"  >
          <Menu navigation={navigation} />
          <Text fontSize={"xl"} fontWeight={"bold"}>
            {route?.params?.title ?? "Home"}
          </Text>
        </Flex>
        <Box width={"40px"} py={3} height="80px">
          <Image source={images.cow} width="100%" resizeMethod={"auto"} resizeMode={"stretch"} height={"100%"} alt="cow" />
        </Box>
      </HStack >
    </>
  );
}
