import { Box, Flex, Image, Text, Pressable } from "native-base";
import { Dimensions } from "react-native";
import { images } from "../Assests";
import React, { useEffect, useMemo, useState } from "react";
import { useDeviceOrientation } from "../Components/useDeviceOrientation";
import { useAppContext } from "../provider/AppContext";

export function Home(props: any) {
  const { userState } = useAppContext();
  const navgationArr = [
    {
      icon: images.calculator,
      title: "Calculator",
      navigation: "InputCalculator",
    },
    {
      icon: images.form,
      title: "Predict",
      navigation:  userState?.userId ? "Predict" : "Login",
    },
    {
      icon: images.list,
      title: "View",
      navigation:  userState?.userId ? "Dashboard" : "Login",
    },
  ];
  return (
    <Flex
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      position="relative"
    >
      <Image
        source={images.homeImage}
        alt="sma"
        resizeMethod={"auto"}
        resizeMode={"contain"}
      />

      <TabBar navigation={props.navigation} navgationArr={navgationArr} />
    </Flex>
  );
}

export const TabBar = ({ navigation, navgationArr }: any) => {
  const [maxWidth, setMaxWidth] = useState<string | null>(null);
  const orientation = useDeviceOrientation();
  useEffect(() => {
    const { width: w } = Dimensions.get("window");

    setMaxWidth(w - 50 + "px");
  }, [orientation]);

  return (
    <Box position={"absolute"} bottom={10}>
      <Flex
        bg={"coolGray.100"}
        borderRadius={10}
        shadow={3}
        m={0}
        alignItems={"center"}
        justifyContent={"center"}
        width={maxWidth ?? "0px"}
        flexDirection={"row"}
      >
        {navgationArr.map((i: any, index : number) => {
          return (
            <Pressable
              onPress={() => navigation?.navigate(i.navigation)}
              m={0}
              flex={1}
              height={"100%"}
              display={"flex"}
              key={index}
            >
              {({ isHovered, isFocused, isPressed }) => {
                return (
                  <Flex
                    py={2}
                    alignItems={"center"}
                    bg={
                      isPressed
                        ? "coolGray.200"
                        : isHovered
                        ? "coolGray.200"
                        : "coolGray.100"
                    }
                    style={{
                      transform: [
                        {
                          scale: isPressed ? 0.96 : 1,
                        },
                      ],
                    }}
                    borderRadius={10}
                  >
                    <Image
                      alt={i.title}
                      source={i.icon}
                      width={"250px"}
                      height={"25px"}
                      resizeMethod={"resize"}
                      resizeMode={"contain"}
                    />
                    <Text>{i.title}</Text>
                  </Flex>
                );
              }}
            </Pressable>
          );
        })}
      </Flex>
    </Box>
  );
};
