import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Box, Button, Flex, Text } from "native-base";
import { ENDPOINTS, fetcher } from "../API/Fetcher";
import { removeAllSecureData } from "../keychain/secureStorage";
import { useAppContext } from "../provider/AppContext";
import { logger } from "../utils/logger";
export function Menu(props: any) {
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
            onPress={() => props.navigation.navigate("Predict")}
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
  const { userState, setUserState } = useAppContext();
  const logout = async() => {
    try { 
      const data = await fetcher.post(ENDPOINTS.LOGOUT, JSON.stringify({
        refreshToken :  userState?.refreshToken,
        userId:  userState?.userId,
      }));
      console.log(data.data);
      if(data.data){
        await removeAllSecureData();
      setUserState(null);
      }
    }
    catch(Err:any){
      logger.error(Err);
    }
  };
  if (userState?.userId)
    return (
      <Flex flexDir={"column"} p={3}>
        <Text
          color="white"
          onPress={() => props.navigation.navigate("Login")}
          fontWeight={"600"}
          fontSize={"xl"}
        >
          {userState.email}
        </Text>
        <Button onPress={logout}>Logout</Button>
      </Flex>
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
