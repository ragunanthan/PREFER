import { Home } from "./Pages/Home";
import SPO from "./Pages/SPO";
import InputCalculator from "./Pages/InputCalculator";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text } from "native-base";
import { Menu } from "./Pages/Menu";

const Drawer = createDrawerNavigator();

export function StackBar() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <Menu {...props} />}
    >
      <Drawer.Group>
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Group>
      <Drawer.Group
        screenOptions={({ navigation }) => ({
          header: () => <Text>sdfsdkf</Text>,
        })}
      >
        <Drawer.Screen name="SPO" component={SPO} />
        <Drawer.Screen name="InputCalculator" component={InputCalculator} />
      </Drawer.Group>
    </Drawer.Navigator>
  );
}
