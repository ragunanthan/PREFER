import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Box, Flex, Text, View,  } from "native-base";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from '@react-navigation/native';
export function Menu(props: any) {

  return (
    <DrawerContentScrollView {...props} flex={1} >
      <Flex
        height={"150"}
        alignItems="center"
        justifyContent={"center"}
        bg="black"
        flex={1}
      >
        <Text color="white" fontWeight={"600"} fontSize={"xl"}>
          Welcome
        </Text>
      </Flex>
      <Box bg="white"  flex={2}>
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
      <Box m="5"  mb="0">
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
