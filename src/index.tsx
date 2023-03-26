import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { extendTheme, NativeBaseProvider, StatusBar, Text } from "native-base";
import "react-native-gesture-handler";

import {
  SPO,
  ICARNIANP,
  ICARNFP,
  Prefer,
  Contact,
  Team,
} from "./Pages/Children";
import InputCalculator from "./Pages/InputCalculator";
import { Menu } from "./Pages/Menu";
import { Home } from "./Pages/Home";
import { Header, CommonHeader } from "./Components/Header";
import { Predict } from "./Pages/Predict";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Login, { Signup } from "./Pages/Login";
import AppContextProvier, { AppContext } from "./provider/AppContext";
import Dashboard from "./Pages/Dashboard";
import { FilterByDate, FilterByMonth, FilterByYear } from "./Pages/Filter";
import { Path } from "./utils/Const";

const Drawer = createDrawerNavigator();

const theme = extendTheme({
  components: {
    Text: {
      baseStyle: {
        fontFamily: "Poppins-Regular",
      },
    },
  },
  fontConfig: {
    Roboto: {
      100: {
        normal: "Poppins-Light",
      },
      200: {
        normal: "Poppins-Light",
      },
      300: {
        normal: "Poppins-Light",
      },
      400: {
        normal: "Poppins-Regular",
      },
      500: {
        normal: "Poppins-Medium",
      },
      600: {
        normal: "Poppins-Bold",
      },
      // Add more variants
      //   700: {
      //     normal: 'Roboto-Bold',
      //   },
      //   800: {
      //     normal: 'Roboto-Bold',
      //     italic: 'Roboto-BoldItalic',
      //   },
      //   900: {
      //     normal: 'Roboto-Bold',
      //     italic: 'Roboto-BoldItalic',
      //   },
    },
    fonts: {
      heading: "Poppins-Bold",
      body: "Poppins-Regular",

      mono: "Poppins",
    },
  },
});

function App() {
  return (
    <SafeAreaProvider>
      <AppContextProvier>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <AppContext.Consumer>
          {({ userState }) => (
            <NativeBaseProvider theme={theme}>
              <NavigationContainer>
                <Drawer.Navigator
                  initialRouteName="Home"
                  drawerContent={(props) => <Menu {...props} />}
                >
                  <Drawer.Group
                    screenOptions={({ navigation }) => ({
                      header: Header,
                    })}
                  >
                    <Drawer.Screen name="Home" component={Home} />
                  </Drawer.Group>
                  <Drawer.Group
                    screenOptions={({ navigation, route }) => ({
                      header: CommonHeader,
                      sceneContainerStyle: {
                        backgroundColor: "#eeeeee",
                        flex: 1,
                      },
                    })}
                  >
                    <Drawer.Screen
                      name="Login"
                      initialParams={{ title: "Login" }}
                      component={Login}
                    />
                    {userState?.userId && (
                      <>
                        <Drawer.Screen
                          name="Dashboard"
                          initialParams={{ title: "Dashboard" }}
                          component={Dashboard}
                        />
                        <Drawer.Screen
                          name={Path.FilterByDate}
                          initialParams={{ title: "By Date" }}
                          component={FilterByDate}
                        />
                        <Drawer.Screen
                          name={Path.FilterByMonth}
                          initialParams={{ title: "By Month" }}
                          component={FilterByMonth}
                        />
                        <Drawer.Screen
                          name={Path.FilterByYear}
                          initialParams={{ title: "By Year" }}
                          component={FilterByYear}
                        />
                      </>
                    )}

                    <Drawer.Screen
                      name="Signup"
                      initialParams={{ title: "Signup" }}
                      component={Signup}
                    />
                    <Drawer.Screen
                      name="SPO"
                      initialParams={{ title: "SPO" }}
                      component={SPO}
                    />
                    <Drawer.Screen
                      name="InputCalculator"
                      initialParams={{ title: "Input Calculator" }}
                      component={InputCalculator}
                    />
                    <Drawer.Screen
                      name="Predict"
                      initialParams={{ title: "Predict" }}
                      component={Predict}
                    />
                    <Drawer.Screen
                      name="ICARNIANP"
                      initialParams={{ title: "ICAR - NIANP" }}
                      component={ICARNIANP}
                    />
                    <Drawer.Screen
                      name="ICARNFP"
                      initialParams={{ title: "ICAR - NFP" }}
                      component={ICARNFP}
                    />

                    <Drawer.Screen
                      name="PREFERApp"
                      initialParams={{ title: "Prefer" }}
                      component={Prefer}
                    />
                    <Drawer.Screen
                      name="Team"
                      initialParams={{ title: "Team" }}
                      component={Team}
                    />

                    <Drawer.Screen
                      name="Contact"
                      initialParams={{ title: "Contact" }}
                      component={Contact}
                    />
                  </Drawer.Group>
                </Drawer.Navigator>
              </NavigationContainer>
            </NativeBaseProvider>
          )}
        </AppContext.Consumer>
      </AppContextProvier>
    </SafeAreaProvider>
  );
}

export default App;
