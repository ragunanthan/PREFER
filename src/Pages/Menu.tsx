import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { Avatar, Box, Button, Flex, HStack, Text, VStack } from "native-base";
import { ENDPOINTS, fetcher } from "../API/Fetcher";
import { removeAllSecureData } from "../keychain/secureStorage";
import { useAppContext } from "../provider/AppContext";
import { logger } from "../utils/logger";

export function Menu(props: any) {
  const { userState } = useAppContext();
  return (
    <DrawerContentScrollView {...props} flex={1}>
      <Flex height={"150"} bg="black">
        <UserInfo props={props} />
      </Flex>
      <Box bg="white" flex={2}>
        <Box
          m="5"
          mb="0"
          borderBottomColor={"black"}
          borderBottomWidth="1"
          borderBottomStyle={"solid"}
          // style={{
          //   borderColor : "red",
          //   borderStyle : "solid",
          //   borderWidth : 1
          // }}
        >
          <DrawerItem
            label={"Home"}
            onPress={() => props.navigation.navigate("Home")}
          />
          <DrawerItem
            label={"SPO"}
            onPress={() => props.navigation.navigate("SPO")}
          />
          <DrawerItem
            label={"Input calculator"}
            onPress={() => props.navigation.navigate("InputCalculator")}
          />
          <DrawerItem
            label={"Predict"}
            onPress={() => userState?.userId ? props.navigation.navigate("Predict") : props.navigation.navigate("Login")}
          />
          <DrawerItem
            label={"View Data"}
            onPress={() => userState?.userId ?  props.navigation.navigate("Dashboard") : props.navigation.navigate("Login")}
          />
        </Box>
        <Box
          m="5"
          mb="0"
          borderBottomColor={"black"}
          borderBottomWidth="1"
          borderBottomStyle={"solid"}
        >
          <Text color={"grey"}>About</Text>
          <DrawerItem
            label={"ICAR - NIAP"}
            onPress={() => props.navigation.navigate("ICARNIANP")}
          />
          <DrawerItem
            label={"ICAR - NFP"}
            onPress={() => props.navigation.navigate("ICARNFP")}
          />
          <DrawerItem
            label={"PREFER app"}
            onPress={() => props.navigation.navigate("PREFERApp")}
          />
          <DrawerItem
            label={"Team"}
            onPress={() => props.navigation.navigate("Team")}
          />
        </Box>
        <Box m="5" mb="0">
          <Text color={"grey"}>Others</Text>
          <DrawerItem
            label={"Contact"}
            onPress={() => props.navigation.navigate("Contact")}
          />
        </Box>
      </Box>
    </DrawerContentScrollView>
  );
}

function UserInfo({ props }: any) {
  const { userState, setUserState, setShowLogin } = useAppContext();
  const logout = async () => {
    try {
      const data = await fetcher.post(
        ENDPOINTS.LOGOUT,
        JSON.stringify({
          refreshToken: userState?.refreshToken,
          userId: userState?.userId,
        })
      );
      if (data.data) {
        await removeAllSecureData();
        setUserState(null);
        props.navigation.navigate("Login")
      }
    } catch (Err: any) {
      logger.error(Err);
    }
  };
  if (userState?.userId)
    return (
      <VStack justifyContent={"center"} flex={1} px={4} space={3} >
        <HStack
          space={5}
          alignItems={"center"}
        >
          <Avatar bg="green.500" size={"md"}>
            {userState.name.toUpperCase().slice(0, 2)}
          </Avatar>
          <VStack>
            <Text color="white" fontSize={"md"} fontWeight={"thin"}>
              Welcome
            </Text>
            <Text color="white" flex={1} fontSize={"md"} noOfLines={1}>
              {userState.name}
            </Text>
          </VStack>
        </HStack>

        <HStack justifyContent={"flex-end"}>
        <Button  px={3} py="1.5" bg={"red.900"} onPress={logout}>
          Logout
        </Button>
        </HStack>
      </VStack>
    );
  return (
    <Flex alignItems="center" justifyContent={"center"} flex={1}>
      <Text
        color="white"
        onPress={() => props.navigation.navigate("Login")}
        fontWeight={"600"}
        fontSize={"xl"}
      >
        Login
      </Text>
    </Flex>
  );
}
